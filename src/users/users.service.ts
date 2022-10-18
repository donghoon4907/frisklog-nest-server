import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { User } from './user.entity';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CreateUserDto } from './dto/create-user.dto';
import { sendMail } from '../common/nodemailer/send-mail.util';
import { FollowingsArgs } from './dto/followings.args';
import { RecommendersArgs } from './dto/recommenders.args';
import { Follow } from './follow.entity';
import { UserStatus } from './user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Follow)
        private readonly followsRepository: Repository<Follow>,
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
            .addSelect('COUNT(posts.id) as postCount')
            .leftJoin('user.posts', 'posts')
            .loadRelationCountAndMap('user.postCount', 'user.posts')
            .loadRelationCountAndMap('user.followerCount', 'user.followers')
            .limit(limit)
            .offset(offset)
            .groupBy('user.id')
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
            .innerJoinAndSelect('followers.requester', 'requester')
            .loadRelationCountAndMap('user.postCount', 'user.posts')
            .loadRelationCountAndMap('user.followerCount', 'user.followers')
            .where('requester.id = :authId', { authId })
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

    findById(id: string) {
        return this.usersRepository.findOneBy({ id });
    }

    findByGithubId(githubId: number) {
        return this.usersRepository.findOneBy({ githubId });
    }

    hasNickname(nickname: string) {
        return this.usersRepository.findOneBy({ nickname });
    }

    hasEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    sendMail(email: string, captcha: string) {
        return sendMail(email, captcha);
    }

    async createUser(createUserDto: CreateUserDto, platformId = 1) {
        const { nickname, email, githubId, avatar } = createUserDto;

        const user = new User();

        user.nickname = nickname;

        user.email = email;

        user.platformId = platformId;

        user.githubId = githubId;

        user.avatar = avatar;

        await this.usersRepository.save(user);

        return user;
    }

    async updateUser(updateUserDto: UpdateUserDto, user: User) {
        const { nickname, status, avatar } = updateUserDto;

        if (nickname) {
            user.nickname = nickname;
        }

        if (status) {
            user.status = status;
        }

        if (avatar) {
            user.avatar = avatar;
        }

        await this.usersRepository.save(user);

        return user;
    }

    async updateSetting(updateSettingDto: UpdateSettingDto, user: User) {
        const { receivePostNotification } = updateSettingDto;

        if (typeof receivePostNotification === 'boolean') {
            user.receivePostNotification = receivePostNotification;
        }

        await this.usersRepository.save(user);

        return user;
    }

    async login(captcha: string, user: User) {
        user.captcha = captcha;

        await this.usersRepository.save(user);

        return user;
    }

    async verify(isKeep: boolean, user: User) {
        user.isKeep = isKeep;

        user.status = UserStatus.ONLINE;

        user.captcha = null;

        user.lastAccessAt = new Date();

        await this.usersRepository.save(user);

        user.token = user.generateToken();

        return user;
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
