import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';

@ArgsType()
export class CommentsArgs extends OffsetPaginatedArgs {
    @Field(() => String)
    postId: string;

    @Field(() => [[String]])
    @IsOptional()
    order?: string[][];
}
