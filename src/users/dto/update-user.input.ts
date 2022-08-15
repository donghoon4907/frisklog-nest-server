import { Field, InputType } from '@nestjs/graphql';
import { Matches, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @Matches(/[a-zA-Z0-9_-]{2, 20}/)
    nickname?: string;

    @Field({ nullable: true })
    @IsOptional()
    avatar?: string;

    @Field({ nullable: true })
    @IsOptional()
    status?: string;
}
