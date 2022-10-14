import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Max, Min } from 'class-validator';

@ArgsType()
export class OffsetPaginatedArgs {
    @Field(() => Int)
    offset = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 12;
}
