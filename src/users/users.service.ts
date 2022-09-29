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

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
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
        id: number,
        followingsArgs: FollowingsArgs,
    ): Promise<OffsetPaginatedUser> {
        const { limit, offset } = followingsArgs;

        const [user] = await this.usersRepository
            .createQueryBuilder('user')
            .loadRelationCountAndMap('user.postCount', 'user.posts')
            .loadRelationCountAndMap('user.followerCount', 'user.followers')
            .limit(limit)
            .offset(offset)
            .getMany();

        const paginator = new OffsetPaginator<User>(offset, limit);

        const followings = await user.followings;

        const { followerCount } = user;

        return paginator.response(followings, followerCount);
    }

    user(id: string): Promise<User> {
        return this.usersRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: {
                followers: true,
                platform: true,
            },
        });
    }

    findById(id: string): Promise<User> {
        return this.usersRepository.findOneBy({ id: parseInt(id, 10) });
    }

    findByNickname(nickname: string, platformId: number = 1): Promise<User> {
        return this.usersRepository.findOneBy({ nickname, platformId });
    }

    findByEmail(email: string, platformId: number = 1): Promise<User> {
        return this.usersRepository.findOneBy({ email, platformId });
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
        (await me.followings).push(target);

        await this.usersRepository.save(me);

        return me;
    }

    async unfollow(me: User, target: User): Promise<User> {
        const followings = await me.followings;

        const index = followings.findIndex(
            (following) => following.id == target.id,
        );

        if (index !== -1) {
            followings.splice(index, 1);

            this.usersRepository.save(me);
        }

        return me;
    }
}
