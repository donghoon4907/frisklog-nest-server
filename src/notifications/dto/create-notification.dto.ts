import { InputType, PickType } from '@nestjs/graphql';
import { Notification } from '../notification.entity';

@InputType()
export class CreateNotificationDto extends PickType(
    Notification,
    ['content', 'url'] as const,
    InputType,
) {}
