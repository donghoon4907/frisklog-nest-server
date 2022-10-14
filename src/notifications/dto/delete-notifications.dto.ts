import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class DeleteNotificationsDto {
    @Field(() => [String])
    @IsArray()
    notifications: string[];
}
