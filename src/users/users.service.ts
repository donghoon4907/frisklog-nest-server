import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { User } from './user.entity';
import { Post } from '../posts/post.entity';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CreateUserDto } from './dto/create-user.dto';
import { sendMail } from '../common/nodemailer/send-mail.util';
import { FollowingsArgs } from './dto/followings.args';
import { RecommendersArgs } from './dto/recommenders.args';
import { Follow } from './follow.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Follow)
        private readonly followsRepository: Repository<Follow>,
        private readonly httpService: HttpService,
    ) {}

    async findAll(usersArgs: UsersArgs): Promise<OffsetPaginatedUser> {
        const { offset, limit, nickname } = usersArgs;

        const where: any = {};

        if (nickname) {
            where.nickname = Like(`%${nickname}%`);
        }

        const [users, usersCount] = await this.usersRepository.findAndCount({
            where,
            relations: {
                followers: true,
            },
            skip: offset,
            take: limit,
            order: {
                nickname: 'ASC',
            },
        });

        const paginator = new OffsetPaginator<User>(offset, limit);

        return paginator.response(users, usersCount);
    }

    async recommenders(
        recommendersArgs: RecommendersArgs,
    ): Promise<OffsetPaginatedUser> {
        const { limit, offset } = recommendersArgs;

        const [recommenders, total] = await this.usersRepository
            .createQueryBuilder('user')
            .addSelect((qb) => {
                return qb.select('COUNT(*)', 'postCount').from(Post, 'post');
            }, 'postCount')
            .loadRelationCountAndMap('user.postCount', 'user.posts')
            .loadRelationCountAndMap('user.followerCount', 'user.followers')
            .limit(limit)
            .offset(offset)
            .orderBy('postCount', 'DESC')
            .getManyAndCount();

        const paginator = new OffsetPaginator<User>(offset, limit);

        return paginator.response(recommenders, total);
    }

    async followings(
        followingsArgs: FollowingsArgs,
        authId: string,
    ): Promise<OffsetPaginatedUser> {
        const { limit, offset, nickname } = followingsArgs;

        const qb = this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.followers', 'followers')
            .loadRelationCountAndMap('user.postCount', 'user.posts')
            .loadRelationCountAndMap('user.followerCount', 'user.followers')
            .where('followers.id = :authId', { authId })
            .limit(limit)
            .offset(offset);

        if (nickname) {
            qb.andWhere('user.nickname like :nickname', {
                nickname: `%${nickname}%`,
            });
        }

        const [followings, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<User>(offset, limit);

        return paginator.response(followings, total);
    }

    async isFollowing(acceptorId: string, requesterId: string) {
        const following = await this.followsRepository.findOne({
            where: {
                acceptor: {
                    id: acceptorId,
                },
                requester: {
                    id: requesterId,
                },
            },
        });

        return following !== null;
    }

    findById(id: string): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    findByNickname(nickname: string): Promise<User> {
        return this.usersRepository.findOneBy({ nickname });
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email });
    }

    findByGithubId(githubId: number): Promise<User> {
        return this.usersRepository.findOneBy({ githubId });
    }

    verifyGithub(code: string): Promise<AxiosResponse<any>> {
        const res = this.httpService.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
        );

        return firstValueFrom(res);
    }

    getGithubProfile(accessToken: string): Promise<AxiosResponse<any>> {
        const res = this.httpService.get('https://api.github.com/user', {
            headers: {
                authorization: `token ${accessToken}`,
            },
        });

        return firstValueFrom(res);
    }

    sendMail(email: string, captcha: string): Promise<any> {
        return sendMail(email, captcha);
    }

    async create(data: CreateUserDto, platformId: number = 1): Promise<User> {
        const user = this.usersRepository.create({ ...data, platformId });

        await this.usersRepository.save(user);

        return user;
    }

    async update(me: User): Promise<User> {
        await this.usersRepository.save(me);

        return me;
    }

    async follow(me: User, target: User): Promise<User> {
        // (await me.followings).push(target);
        const follow = new Follow();

        follow.acceptor = Promise.resolve(target);

        follow.requester = Promise.resolve(me);

        await this.followsRepository.save(follow);

        return target;
    }

    async unfollow(me: User, target: User): Promise<User> {
        const followings = await me.followings;

        for (let i = 0; i < followings.length; i++) {
            const acceptor = await followings[i].acceptor;

            if (target.id === acceptor.id) {
                this.followsRepository.remove(followings[i]);
            }
        }

        return target;
    }
}
