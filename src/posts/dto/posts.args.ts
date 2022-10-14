import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { OffsetPaginatedArgs } from 'src/common/paging/offset/offset.args';

@ArgsType()
export class PostsArgs extends OffsetPaginatedArgs {
    @Field({ description: '포스트 검색어', nullable: true })
    @IsOptional()
    searchKeyword?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    userId?: string;
}
