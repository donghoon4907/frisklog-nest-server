import { Field, ArgsType, Int } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class RecommendCategoriesArgs {
    @Field(() => Int)
    offset = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 12;
}
