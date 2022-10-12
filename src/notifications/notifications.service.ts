import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
    ) {}

    async createNotification(
        createNotificationDto: CreateNotificationDto,
        user: User,
        target: User,
    ) {
        const { content, url } = createNotificationDto;

        const noti = new Notification();

        noti.content = content;

        noti.user = Promise.resolve(user);

        noti.target = Promise.resolve(target);

        noti.url = url;

        await this.notificationsRepository.save(noti);

        return noti;
    }
}
