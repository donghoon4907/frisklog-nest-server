import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { VerifyUserInput } from './dto/verify-user.input';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { AuthGuard } from './auth/auth.guard';
import { AuthUser } from './auth/auth.decorator';
import { UserStatus } from './user.interface';
import { FollowingsArgs } from './dto/followings.args';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => OffsetPaginatedUser)
    users(@Args() usersArgs: UsersArgs) {
        return this.usersService.findAll(usersArgs);
    }

    @Query((returns) => User)
    async user(@Args('id') id: number) {
        const user = await this.usersService.findOne(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        return user;
    }

    @Query((returns) => OffsetPaginatedUser)
    @UseGuards(AuthGuard)
    async followings(
        @AuthUser() me: User,
        @Args() followingsArgs: FollowingsArgs,
    ) {
        return this.usersService.followings(me.id, followingsArgs);
    }

    @Mutation((returns) => User)
    async addUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        const { nickname, email } = createUserInput;

        const usingNickname = await this.usersService.findOneByNickname(
            nickname,
        );

        if (usingNickname !== null) {
            throw new ForbiddenException('사용중인 닉네임입니다.');
        }

        const usingEmail = await this.usersService.findOneByEmail(email);

        if (usingEmail !== null) {
            throw new ForbiddenException('사용중인 이메일입니다.');
        }

        return this.usersService.create(createUserInput);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updateUser(
        @AuthUser() me: User,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        const { nickname, avatar, status } = updateUserInput;

        if (nickname) {
            if (nickname !== me.nickname) {
                const existUser = await this.usersService.findOneByNickname(
                    nickname,
                    me.platformId,
                );

                if (existUser !== null) {
                    throw new ForbiddenException('사용중인 닉네임입니다.');
                }

                me.nickname = nickname;
            }
        }

        if (avatar) {
            me.avatar = avatar;
        }

        if (status) {
            me.status = status;
        }

        const user = await this.usersService.update(me);

        user.token = user.refreshToken();

        return user;
    }

    @Mutation((returns) => Boolean)
    async logIn(@Args('email') email: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        user.captcha = Math.floor(Math.random() * 9000 + 1000).toString();

        try {
            await this.usersService.sendMail(user.email, user.captcha);
        } catch {
            throw new ForbiddenException('메일 전송 중 오류가 발생했습니다.');
        }

        await this.usersService.update(user);

        return true;
    }

    @Mutation((returns) => User)
    async verify(@Args('verifyUserInput') verifyUserInput: VerifyUserInput) {
        const { email, captcha, isKeep } = verifyUserInput;

        const user = await this.usersService.findOneByEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        if (user.captcha !== captcha) {
            throw new ForbiddenException('보안문자가 일치하지 않습니다.');
        }

        user.status = UserStatus.ONLINE;

        user.isKeep = isKeep;

        await this.usersService.update(user);

        user.token = user.generateToken();

        return user;
    }

    @Mutation((returns) => User)
    async githubLogin(@Args('code') code: string) {
        const { data } = await this.usersService.verifyGithub(code);

        const fullStrToken = data.split('&')[0];

        const accessToken = fullStrToken.split('=')[1];

        const userInfo = await this.usersService.getGithubProfile(accessToken);

        const { login, avatar_url } = userInfo.data;

        let user = await this.usersService.findOneByNickname(login, 2);

        if (user === null) {
            user = await this.usersService.create(
                { nickname: login, avatar: avatar_url },
                2,
            );
        }

        user.token = user.generateToken();

        return user;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async follow(@AuthUser() me: User, @Args('id') id: number) {
        const user = await this.usersService.findOneById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        me.followers.push(user);

        await this.usersService.update(me);

        return true;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async unfollow(@AuthUser() me: User, @Args('id') id: number) {
        const findIndex = me.followers.findIndex((user) => user.id === id);

        if (findIndex === -1) {
            throw new ForbiddenException('팔로잉된 사용자가 아닙니다.');
        }

        me.followers.splice(findIndex, 1);

        await this.usersService.update(me);

        return true;
    }
}
