import { Field, ArgsType, Int, ID } from '@nestjs/graphql';
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class CommentsArgs {
    @Field(() => Int)
    offset = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 12;

    @Field(() => String)
    postId: string;

    @Field(() => [[String]])
    @IsOptional()
    order?: string[][];
}
