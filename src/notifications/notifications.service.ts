import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { NotificationsArgs } from './dto/notifications.args';
import { OffsetPaginatedNotification } from './dto/notifications.response';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
    ) {}

    async notifications(
        notificationsArgs: NotificationsArgs,
        authId: string,
    ): Promise<OffsetPaginatedNotification> {
        const { offset, limit } = notificationsArgs;

        const qb = this.notificationsRepository
            .createQueryBuilder('notification')
            .innerJoin('notification.to', 'to')
            .where('to.id = :authId', { authId })
            .orderBy('notification.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);

        const [notifications, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Notification>(offset, limit);

        return paginator.response(notifications, total);
    }

    findById(id: string) {
        return this.notificationsRepository.findOneBy({ id });
    }

    async readNotifications(readNotificationDto: ReadNotificationDto) {
        const { notifications } = readNotificationDto;

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

    async createNotification(
        createNotificationDto: CreateNotificationDto,
        from: User,
        to: User,
    ) {
        const { content, url } = createNotificationDto;

        const noti = new Notification();

        noti.content = content;

        noti.from = Promise.resolve(from);

        noti.to = Promise.resolve(to);

        noti.url = url;

        await this.notificationsRepository.save(noti);

        return noti;
    }
}
