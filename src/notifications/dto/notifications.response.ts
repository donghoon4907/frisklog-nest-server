import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { Notification } from '../notification.entity';

@ObjectType()
export class OffsetPaginatedNotification extends OffsetPaginated(
    Notification,
) {}
