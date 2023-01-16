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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
let NotificationsService = class NotificationsService {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
    }
    async notifications(notificationsArgs, authId) {
        const { offset, limit } = notificationsArgs;
        const qb = this.notificationsRepository
            .createQueryBuilder('notification')
            .innerJoin('notification.to', 'to')
            .where('to.id = :authId', { authId })
            .orderBy('notification.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        const [notifications, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(notifications, total);
    }
    findById(id) {
        return this.notificationsRepository.findOneBy({ id });
    }
    async readNotifications(readNotificationsDto) {
        const { notifications } = readNotificationsDto;
        const now = new Date();
        const nodes = [];
        for (let i = 0; i < notifications.length; i++) {
            const noti = await this.findById(notifications[i]);
            if (noti) {
                noti.readedAt = now;
                await this.notificationsRepository.save(noti);
                nodes.push(noti);
            }
        }
        return nodes;
    }
    async createNotification(createNotificationDto, from, to) {
        const { content, url } = createNotificationDto;
        const noti = new notification_entity_1.Notification();
        noti.content = content;
        noti.from = Promise.resolve(from);
        noti.to = Promise.resolve(to);
        noti.url = url;
        await this.notificationsRepository.save(noti);
        return noti;
    }
    async deleteNotifications(deleteNotificationsDto) {
        const { notifications } = deleteNotificationsDto;
        const nodes = [];
        for (let i = 0; i < notifications.length; i++) {
            const noti = await this.findById(notifications[i]);
            if (noti) {
                await this.notificationsRepository.softRemove(noti);
                nodes.push(noti);
            }
        }
        return nodes;
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map