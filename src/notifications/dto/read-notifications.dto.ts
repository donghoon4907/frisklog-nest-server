import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class ReadNotificationsDto {
    @Field(() => [String])
    @IsArray()
    notifications: string[];
}
