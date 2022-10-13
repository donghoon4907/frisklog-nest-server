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
