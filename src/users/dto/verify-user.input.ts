import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class VerifyUserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    isKeep: boolean;

    @Field()
    captcha: string;
}
