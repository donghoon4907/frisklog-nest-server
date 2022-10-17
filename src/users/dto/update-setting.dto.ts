import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../user.entity';

@InputType()
export class UpdateSettingDto extends PartialType(
    PickType(User, ['receivePostNotification'] as const, InputType),
) {}
