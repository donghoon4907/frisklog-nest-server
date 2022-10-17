import { Field, InputType, PickType } from '@nestjs/graphql';

import { Setting } from '../setting.entity';

@InputType()
export class UpdateSettingInput extends PickType(
    Setting,
    ['followerPostNoti'] as const,
    InputType,
) {}

@InputType()
export class UpdateSettingDto {
    @Field()
    id: string;

    @Field((type) => UpdateSettingInput)
    data: UpdateSettingInput;
}
