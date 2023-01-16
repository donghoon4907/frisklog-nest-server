import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { ReadNotificationsDto } from './dto/read-notifications.dto';
import { NotificationsArgs } from './dto/notifications.args';
import { DeleteNotificationsDto } from './dto/delete-notifications.dto';
export declare class NotificationsService {
    private readonly notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    notifications(notificationsArgs: NotificationsArgs, authId: string): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Notification>>;
    findById(id: string): Promise<Notification>;
    readNotifications(readNotificationsDto: ReadNotificationsDto): Promise<any[]>;
    createNotification(createNotificationDto: CreateNotificationDto, from: User, to: User): Promise<Notification>;
    deleteNotifications(deleteNotificationsDto: DeleteNotificationsDto): Promise<any[]>;
}
