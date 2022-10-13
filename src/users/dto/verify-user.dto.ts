import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class VerifyUserDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    isKeep: boolean;

    @Field()
    captcha: string;
}
