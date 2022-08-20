import { Field, ArgsType, ID, Int } from '@nestjs/graphql';
import { IsOptional, Min, Max } from 'class-validator';

@ArgsType()
export class FollowingsArgs {
    @Field((type) => Int)
    @Min(1)
    @Max(50)
    limit = 12;

    @Field((type) => Int)
    offset = 0;

    @Field(() => [[String]], { nullable: true })
    @IsOptional()
    order?: String[][];
}
