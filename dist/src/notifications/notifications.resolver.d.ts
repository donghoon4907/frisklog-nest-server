import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { ReadNotificationsDto } from './dto/read-notifications.dto';
import { NotificationsArgs } from './dto/notifications.args';
import { User } from '../users/user.entity';
import { DeleteNotificationsDto } from './dto/delete-notifications.dto';
export declare class NotificationsResolver {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    notifications(me: User, notificationsArgs: NotificationsArgs): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Notification>>;
    readNotifications(readNotificationsDto: ReadNotificationsDto): Promise<any[]>;
    deleteNotifications(deleteNotificationsDto: DeleteNotificationsDto): Promise<any[]>;
}
