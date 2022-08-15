import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Matches(/[a-zA-Z0-9_-]{2, 20}/)
    nickname: string;

    @Field({ nullable: true })
    @IsOptional()
    avatar?: string;
}
