import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
    Context,
} from '@nestjs/graphql';
import {
    ForbiddenException,
    forwardRef,
    Inject,
    UseGuards,
} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { AuthGuard } from './auth/auth.guard';
import { AuthUser } from './auth/auth.decorator';
import { FollowingsArgs } from './dto/followings.args';
import { RecommendersArgs } from './dto/recommenders.args';
import { decodeToken, getBearerToken } from '../common/context';
import { AttendanceService } from '../attendance/attendance.service';
import { GithubService } from '../github/github.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { NaverService } from '../naver/naver.service';

@Resolver((of) => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => AttendanceService))
        private readonly attendanceService: AttendanceService,
        @Inject(forwardRef(() => GithubService))
        private readonly githubService: GithubService,
        @Inject(forwardRef(() => NaverService))
        private readonly naverService: NaverService,
    ) {}

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
        const user = await this.usersService.findById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        return user;
    }

    @Query((returns) => User)
    @UseGuards(AuthGuard)
    async loadUser(@AuthUser() me: User) {
        const user = await this.usersService.findById(me.id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }
        // 출석 로그 추가
        await this.attendanceService.findOrCreate(me.id);

        return user;
    }

    @Query((returns) => OffsetPaginatedUser)
    @UseGuards(AuthGuard)
    async followings(
        @AuthUser() me: User,
        @Args() followingsArgs: FollowingsArgs,
    ) {
        return this.usersService.followings(followingsArgs, me.id);
    }

    @Mutation((returns) => User)
    async addUser(@Args('input') createUserDto: CreateUserDto) {
        const { nickname, email } = createUserDto;

        const hasNickname = await this.usersService.hasNickname(nickname);

        if (hasNickname) {
            throw new ForbiddenException('사용중인 닉네임입니다.');
        }

        const hasEmail = await this.usersService.hasEmail(email);

        if (hasEmail) {
            throw new ForbiddenException('사용중인 이메일입니다.');
        }

        return this.usersService.createUser(createUserDto);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updateUser(
        @AuthUser() me: User,
        @Args('input') updateUserDto: UpdateUserDto,
    ) {
        const { nickname } = updateUserDto;

        if (nickname) {
            if (nickname !== me.nickname) {
                const hasNickname = await this.usersService.hasNickname(
                    nickname,
                );

                if (hasNickname) {
                    throw new ForbiddenException('사용중인 닉네임입니다.');
                }
            }
        }

        const user = await this.usersService.updateUser(updateUserDto, me);

        user.token = user.generateToken();

        return user;
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updateSetting(
        @AuthUser() me: User,
        @Args('input') updateSettingDto: UpdateSettingDto,
    ) {
        const user = await this.usersService.updateSetting(
            updateSettingDto,
            me,
        );

        return user;
    }

    @Mutation((returns) => Boolean)
    async logIn(@Args('email') email: string) {
        const user = await this.usersService.hasEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        const captcha = Math.floor(Math.random() * 9000 + 1000).toString();

        try {
            await this.usersService.sendMail(user.email, captcha);
        } catch (e) {
            throw new ForbiddenException('메일 전송 중 오류가 발생했습니다.');
        }

        await this.usersService.login(captcha, user);

        return true;
    }

    @Mutation((returns) => User)
    async verify(@Args('input') verifyUserDto: VerifyUserDto) {
        const { email, captcha, isKeep } = verifyUserDto;

        const user = await this.usersService.hasEmail(email);

        if (user === null) {
            throw new ForbiddenException('등록되지 않은 이메일 입니다.');
        }

        if (user.captcha !== captcha) {
            throw new ForbiddenException('보안문자가 일치하지 않습니다.');
        }

        return this.usersService.verify(isKeep, user);
    }

    @Mutation((returns) => User)
    async githubLogIn(@Args('code') code: string) {
        try {
            const { data } = await this.githubService.getAccessToken(code);

            const fullStrToken = data.split('&')[0];

            const accessToken = fullStrToken.split('=')[1];

            const userInfo = await this.githubService.getProfile(accessToken);

            const { id, login, avatar_url } = userInfo.data;

            let user = await this.usersService.findByGithubId(id);

            if (user === null) {
                const params = {
                    nickname: login,
                    avatar: avatar_url,
                    githubId: id,
                };

                user = await this.usersService.createUser(params, 2);
            }

            return this.usersService.verify(true, user);
        } catch (e) {
            console.log(e.message);

            return null;
        }
    }

    @Mutation((returns) => User)
    async naverLogIn(@Args('code') code: string) {
        try {
            const { data } = await this.naverService.getAccessToken(code);

            const { access_token } = data;

            const userInfo = await this.naverService.getProfile(access_token);

            const { id, nickname, profile_image } = userInfo.data.response;

            let user = await this.usersService.findByNaverId(id);

            if (user === null) {
                const params = {
                    nickname,
                    avatar: profile_image,
                    naverId: id,
                };

                user = await this.usersService.createUser(params, 3);
            }

            return this.usersService.verify(true, user);
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async follow(@AuthUser() me: User, @Args('id') id: string) {
        const user = await this.usersService.findById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        return this.usersService.follow(me, user);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async unfollow(@AuthUser() me: User, @Args('id') id: string) {
        const user = await this.usersService.findById(id);

        if (user === null) {
            throw new ForbiddenException('존재하지 않는 사용자입니다.');
        }

        return this.usersService.unfollow(me, user);
    }

    @ResolveField((returns) => Boolean)
    isFollowing(@Parent() user: User, @Context() ctx: any) {
        const token = getBearerToken(ctx);

        if (token) {
            const { id } = decodeToken(token);

            if (id) {
                return this.usersService.isFollowing(user.id, id);
            }
        } else {
            return false;
        }
    }

    @ResolveField((returns) => Boolean)
    async isMe(@Parent() user: User, @Context() ctx: any) {
        const token = getBearerToken(ctx);

        if (token) {
            const { id } = decodeToken(token);

            if (id) {
                return user.id === id;
            }
        } else {
            return false;
        }
    }
}
