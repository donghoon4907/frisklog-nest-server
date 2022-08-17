import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsOptional()
    nickname?: string;

    @Field({ nullable: true })
    @IsOptional()
    avatar?: string;

    @Field({ nullable: true })
    @IsOptional()
    status?: string;

    @Field({ nullable: true })
    @IsOptional()
    isKeep?: boolean;
}
