"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const CryptoJS = require("crypto-js");
const user_entity_1 = require("./user.entity");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const users_args_1 = require("./dto/users.args");
const users_response_1 = require("./dto/users.response");
const auth_guard_1 = require("./auth/auth.guard");
const auth_decorator_1 = require("./auth/auth.decorator");
const followings_args_1 = require("./dto/followings.args");
const recommenders_args_1 = require("./dto/recommenders.args");
const context_1 = require("../common/context");
const attendance_service_1 = require("../attendance/attendance.service");
const github_service_1 = require("../github/github.service");
const update_setting_dto_1 = require("./dto/update-setting.dto");
const naver_service_1 = require("../naver/naver.service");
const send_email_dto_1 = require("./dto/send-email.dto");
let UsersResolver = class UsersResolver {
    constructor(usersService, attendanceService, githubService, naverService) {
        this.usersService = usersService;
        this.attendanceService = attendanceService;
        this.githubService = githubService;
        this.naverService = naverService;
    }
    users(usersArgs) {
        return this.usersService.findAll(usersArgs);
    }
    recommenders(recommendersArgs) {
        return this.usersService.recommenders(recommendersArgs);
    }
    async user(id) {
        const user = await this.usersService.findById(id);
        if (user === null) {
            throw new common_1.ForbiddenException('존재하지 않는 사용자입니다.');
        }
        return user;
    }
    async loadUser(me) {
        const user = await this.usersService.findById(me.id);
        if (user === null) {
            throw new common_1.ForbiddenException('존재하지 않는 사용자입니다.');
        }
        await this.attendanceService.findOrCreate(me.id);
        return user;
    }
    async followings(me, followingsArgs) {
        return this.usersService.followings(followingsArgs, me.id);
    }
    async addUser(createUserDto) {
        const { nickname, email } = createUserDto;
        const hasNickname = await this.usersService.hasNickname(nickname);
        if (hasNickname) {
            throw new common_1.ForbiddenException('사용중인 닉네임입니다.');
        }
        const hasEmail = await this.usersService.hasEmail(email);
        if (hasEmail) {
            throw new common_1.ForbiddenException('사용중인 이메일입니다.');
        }
        return this.usersService.createUser(createUserDto);
    }
    async updateUser(me, updateUserDto) {
        const { nickname } = updateUserDto;
        if (nickname) {
            if (nickname !== me.nickname) {
                const hasNickname = await this.usersService.hasNickname(nickname);
                if (hasNickname) {
                    throw new common_1.ForbiddenException('사용중인 닉네임입니다.');
                }
            }
        }
        const user = await this.usersService.updateUser(updateUserDto, me);
        user.token = user.generateToken();
        return user;
    }
    async updateSetting(me, updateSettingDto) {
        const user = await this.usersService.updateSetting(updateSettingDto, me);
        return user;
    }
    async logIn(email) {
        const user = await this.usersService.hasEmail(email);
        if (user === null) {
            throw new common_1.ForbiddenException('등록되지 않은 이메일 입니다.');
        }
        const captcha = Math.floor(Math.random() * 9000 + 1000).toString();
        try {
            await this.usersService.sendMail(user.email, captcha);
        }
        catch (e) {
            throw new common_1.ForbiddenException('메일 전송 중 오류가 발생했습니다.');
        }
        await this.usersService.login(captcha, user);
        return true;
    }
    async sendEmail(sendEmailDto) {
        const { email, captcha } = sendEmailDto;
        const user = await this.usersService.hasEmail(email);
        if (user !== null) {
            throw new common_1.ForbiddenException('사용중인 이메일 입니다.');
        }
        try {
            const bytes = CryptoJS.AES.decrypt(captcha, process.env.CRYPTO_SECRET);
            const decryptedCaptcha = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            await this.usersService.sendMail(email, decryptedCaptcha);
        }
        catch (_a) {
            throw new common_1.ForbiddenException('메일 전송 중 오류가 발생했습니다.');
        }
        return true;
    }
    async verify(verifyUserDto) {
        const { email, captcha, isKeep } = verifyUserDto;
        const user = await this.usersService.hasEmail(email);
        if (user === null) {
            throw new common_1.ForbiddenException('등록되지 않은 이메일 입니다.');
        }
        if (user.captcha !== captcha) {
            throw new common_1.ForbiddenException('보안문자가 일치하지 않습니다.');
        }
        return this.usersService.verify(isKeep, user);
    }
    async githubLogIn(code) {
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
        }
        catch (e) {
            console.log(e.message);
            return null;
        }
    }
    async naverLogIn(code) {
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
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async follow(me, id) {
        const user = await this.usersService.findById(id);
        if (user === null) {
            throw new common_1.ForbiddenException('존재하지 않는 사용자입니다.');
        }
        return this.usersService.follow(me, user);
    }
    async unfollow(me, id) {
        const user = await this.usersService.findById(id);
        if (user === null) {
            throw new common_1.ForbiddenException('존재하지 않는 사용자입니다.');
        }
        return this.usersService.unfollow(me, user);
    }
    isFollowing(user, ctx) {
        const token = (0, context_1.getBearerToken)(ctx);
        if (token) {
            const { id } = (0, context_1.decodeToken)(token);
            if (id) {
                return this.usersService.isFollowing(user.id, id);
            }
        }
        else {
            return false;
        }
    }
    async isMe(user, ctx) {
        const token = (0, context_1.getBearerToken)(ctx);
        if (token) {
            const { id } = (0, context_1.decodeToken)(token);
            if (id) {
                return user.id === id;
            }
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => users_response_1.OffsetPaginatedUser),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_args_1.UsersArgs]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)((returns) => users_response_1.OffsetPaginatedUser),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recommenders_args_1.RecommendersArgs]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "recommenders", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "loadUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => users_response_1.OffsetPaginatedUser),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        followings_args_1.FollowingsArgs]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "followings", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "addUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_setting_dto_1.UpdateSettingDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateSetting", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "logIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "sendEmail", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.VerifyUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "verify", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "githubLogIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "naverLogIn", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "follow", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "unfollow", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => Boolean),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "isFollowing", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => Boolean),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "isMe", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)((of) => user_entity_1.User),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => attendance_service_1.AttendanceService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => github_service_1.GithubService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => naver_service_1.NaverService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        attendance_service_1.AttendanceService,
        github_service_1.GithubService,
        naver_service_1.NaverService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map