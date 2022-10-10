import { Field, ArgsType, Int } from '@nestjs/graphql';
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class UsersArgs {
    @Field(() => Int)
    offset = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 12;

    @Field({ description: '닉네임', nullable: true })
    @IsOptional()
    nickname?: string;
}
