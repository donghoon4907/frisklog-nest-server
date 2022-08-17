import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
    NotFoundException,
    ForbiddenException,
    UseGuards,
} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthUser } from './user.decorator';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => OffsetPaginatedUser)
    users(@Args() usersArgs: UsersArgs): Promise<OffsetPaginatedUser> {
        return this.usersService.findAll(usersArgs);
    }

    @Query((returns) => User)
    async user(@Args('id') id: number): Promise<User> {
        const user = await this.usersService.findOne(id);

        if (user === null) {
            throw new NotFoundException(id);
        }

        return user;
    }

    @Mutation((returns) => User)
    async addUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        const { nickname, email } = createUserInput;

        const usingNickname = await this.usersService.findOneByNickname(
            nickname,
        );

        if (usingNickname !== null) {
            throw new ForbiddenException(
                `'${nickname}' 사용중인 닉네임입니다.`,
            );
        }

        const usingEmail = await this.usersService.findOneByEmail(email);

        if (usingEmail !== null) {
            throw new ForbiddenException(`'${email}' 사용중인 이메일입니다.`);
        }

        return this.usersService.create(createUserInput);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updateUser(
        @AuthUser() me: User,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<User> {
        const { nickname, avatar, status } = updateUserInput;

        if (nickname) {
            if (nickname !== me.nickname) {
                const existUser = await this.usersService.findOneByNickname(
                    nickname,
                    me.platformId,
                );

                if (existUser !== null) {
                    throw new ForbiddenException(
                        `'${nickname}' 사용중인 닉네임입니다.`,
                    );
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

    @Mutation((returns) => User)
    async logIn(@Args('email') email: string): Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        user.captcha = Math.floor(Math.random() * 9000 + 1000).toString();

        try {
            await this.usersService.sendMail(user.email, user.captcha);

            await this.usersService.update(user);

            return true;
        } catch {
            throw new ForbiddenException('로그인 도중 오류가 발생했습니다.');
        }
    }
}
