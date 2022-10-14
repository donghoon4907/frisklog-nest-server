import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { ReadNotificationsDto } from './dto/read-notifications.dto';
import { OffsetPaginatedNotification } from './dto/notifications.response';
import { NotificationsArgs } from './dto/notifications.args';
import { AuthUser } from '../users/auth/auth.decorator';
import { AuthGuard } from '../users/auth/auth.guard';
import { User } from '../users/user.entity';
import { DeleteNotificationsDto } from './dto/delete-notifications.dto';

@Resolver((of) => Notification)
export class NotificationsResolver {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Query((returns) => OffsetPaginatedNotification)
    @UseGuards(AuthGuard)
    notifications(
        @AuthUser() me: User,
        @Args() notificationsArgs: NotificationsArgs,
    ) {
        return this.notificationsService.notifications(
            notificationsArgs,
            me.id,
        );
    }

    @Mutation((returns) => [Notification])
    readNotifications(
        @Args('input') readNotificationsDto: ReadNotificationsDto,
    ) {
        return this.notificationsService.readNotifications(
            readNotificationsDto,
        );
    }

    @Mutation((returns) => [Notification])
    deleteNotifications(
        @Args('input') deleteNotificationsDto: DeleteNotificationsDto,
    ) {
        return this.notificationsService.deleteNotifications(
            deleteNotificationsDto,
        );
    }
}
