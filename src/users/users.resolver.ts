import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserInput } from './dto/verify-user.input';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { AuthGuard } from './auth/auth.guard';
import { AuthUser } from './auth/auth.decorator';
import { UserStatus } from './user.interface';
import { FollowingsArgs } from './dto/followings.args';
import { RecommendersArgs } from './dto/recommenders.args';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => OffsetPaginatedUser)
    users(@Args() usersArgs: UsersArgs) {
        return this.usersService.findAll(usersArgs);
    }

    @Query((returns) => OffsetPaginatedUser)
    recommenders(@Args() recommendersArgs: RecommendersArgs) {
        return this.usersService.recommenders(recommendersArgs);
    }

    @Query((returns) => User)
    async user(@Args('id') id: string) {
        const user = await this.usersService.user(id);

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
    async addUser(@Args('input') createUserDto: CreateUserDto) {
        const { nickname, email } = createUserDto;

        const usingNickname = await this.usersService.findByNickname(nickname);

        if (usingNickname !== null) {
            throw new ForbiddenException('사용중인 닉네임입니다.');
        }

        const usingEmail = await this.usersService.findByEmail(email);

        if (usingEmail !== null) {
            throw new ForbiddenException('사용중인 이메일입니다.');
        }

        return this.usersService.create(createUserDto);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updateUser(
        @AuthUser() me: User,
        @Args('input') updateUserDto: UpdateUserDto,
    ) {
        const { nickname, avatar, status, isKeep } = updateUserDto;

        if (nickname) {
            if (nickname !== me.nickname) {
                const existUser = await this.usersService.findByNickname(
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

        if (typeof isKeep === 'boolean') {
            me.isKeep = isKeep;
        }

        const user = await this.usersService.update(me);

        user.token = user.generateToken();

        return user;
    }

    @Mutation((returns) => Boolean)
    async logIn(@Args('email') email: string) {
        const user = await this.usersService.findByEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        user.captcha = Math.floor(Math.random() * 9000 + 1000).toString();

        try {
            await this.usersService.sendMail(user.email, user.captcha);
        } catch (e) {
            console.log(e);
            throw new ForbiddenException('메일 전송 중 오류가 발생했습니다.');
        }

        await this.usersService.update(user);

        return true;
    }

    @Mutation((returns) => User)
    async verify(@Args('input') verifyUserInput: VerifyUserInput) {
        const { email, captcha, isKeep } = verifyUserInput;

        const user = await this.usersService.findByEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        if (user.captcha !== captcha) {
            throw new ForbiddenException('보안문자가 일치하지 않습니다.');
        }

        user.status = UserStatus.ONLINE;

        user.isKeep = isKeep;

        await this.usersService.update(user);

        await user.followings;

        user.token = user.generateToken();

        return user;
    }

    @Mutation((returns) => User)
    async githubLogIn(@Args('code') code: string) {
        try {
            const { data } = await this.usersService.verifyGithub(code);

            const fullStrToken = data.split('&')[0];

            const accessToken = fullStrToken.split('=')[1];

            const userInfo = await this.usersService.getGithubProfile(
                accessToken,
            );

            const { id, login, avatar_url } = userInfo.data;

            let user = await this.usersService.findByGithubId(id);

            if (user === null) {
                user = await this.usersService.create(
                    { nickname: login, avatar: avatar_url, githubId: id },
                    2,
                );
            }

            user.isKeep = true;

            user.token = user.generateToken();

            return user;
        } catch (e) {
            console.log(e.message);

            return null;
        }
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async follow(@AuthUser() me: User, @Args('id') id: string) {
        const user = await this.usersService.findById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        await this.usersService.follow(me, user);

        return true;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async unfollow(@AuthUser() me: User, @Args('id') id: string) {
        const user = await this.usersService.findById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        await this.usersService.unfollow(me, user);

        return true;
    }
}
