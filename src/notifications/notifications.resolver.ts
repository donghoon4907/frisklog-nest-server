import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { OffsetPaginatedNotification } from './dto/notifications.response';
import { NotificationsArgs } from './dto/notifications.args';
import { AuthUser } from '../users/auth/auth.decorator';
import { AuthGuard } from '../users/auth/auth.guard';
import { User } from '../users/user.entity';

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
    readNotifications(@Args('input') readNotificationDto: ReadNotificationDto) {
        return this.notificationsService.readNotifications(readNotificationDto);
    }
}
