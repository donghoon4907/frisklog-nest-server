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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
const send_mail_util_1 = require("../common/nodemailer/send-mail.util");
const follow_entity_1 = require("./follow.entity");
const user_interface_1 = require("./user.interface");
let UsersService = class UsersService {
    constructor(usersRepository, followsRepository) {
        this.usersRepository = usersRepository;
        this.followsRepository = followsRepository;
    }
    async findAll(usersArgs) {
        const { offset, limit, nickname } = usersArgs;
        const where = {};
        if (nickname) {
            where.nickname = (0, typeorm_2.Like)(`%${nickname}%`);
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
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(users, usersCount);
    }
    async recommenders(recommendersArgs) {
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
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(recommenders, total);
    }
    async followings(followingsArgs, authId) {
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
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(followings, total);
    }
    async isFollowing(acceptorId, requesterId) {
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
    findById(id) {
        return this.usersRepository.findOneBy({ id });
    }
    findByGithubId(githubId) {
        return this.usersRepository.findOneBy({ githubId });
    }
    hasNickname(nickname) {
        return this.usersRepository.findOneBy({ nickname });
    }
    hasEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    sendMail(email, captcha) {
        return (0, send_mail_util_1.sendMail)(email, captcha);
    }
    async createUser(createUserDto, platformId = 1) {
        const { nickname, email, githubId, avatar } = createUserDto;
        const user = new user_entity_1.User();
        user.nickname = nickname;
        user.email = email;
        user.platformId = platformId;
        user.githubId = githubId;
        user.avatar = avatar;
        await this.usersRepository.save(user);
        return user;
    }
    async updateUser(updateUserDto, user) {
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
    async updateSetting(updateSettingDto, user) {
        const { receivePostNotification, receiveLikeNotification } = updateSettingDto;
        if (typeof receivePostNotification === 'boolean') {
            user.receivePostNotification = receivePostNotification;
        }
        if (typeof receiveLikeNotification === 'boolean') {
            user.receiveLikeNotification = receiveLikeNotification;
        }
        await this.usersRepository.save(user);
        return user;
    }
    async login(captcha, user) {
        user.captcha = captcha;
        await this.usersRepository.save(user);
        return user;
    }
    async verify(isKeep, user) {
        user.isKeep = isKeep;
        user.status = user_interface_1.UserStatus.ONLINE;
        user.captcha = null;
        user.lastAccessAt = new Date();
        await this.usersRepository.save(user);
        user.token = user.generateToken();
        return user;
    }
    async follow(me, target) {
        const follow = new follow_entity_1.Follow();
        follow.acceptor = Promise.resolve(target);
        follow.requester = Promise.resolve(me);
        await this.followsRepository.save(follow);
        return target;
    }
    async unfollow(me, target) {
        const followings = await me.followings;
        for (let i = 0; i < followings.length; i++) {
            const acceptor = await followings[i].acceptor;
            if (target.id === acceptor.id) {
                this.followsRepository.remove(followings[i]);
            }
        }
        return target;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map