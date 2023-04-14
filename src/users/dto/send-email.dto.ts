import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SendEmailDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    captcha: string;
}
