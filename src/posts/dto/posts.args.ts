import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { OffsetPaginatedArgs } from 'src/common/paging/offset/offset.args';
import { PostVisibility } from '../post.interface';

@ArgsType()
export class PostsArgs extends OffsetPaginatedArgs {
    @Field({ description: '포스트 검색어', nullable: true })
    @IsOptional()
    searchKeyword?: string;

    @Field({ description: '사용자 ID', nullable: true })
    @IsOptional()
    userId?: string;

    @Field({ nullable: true })
    @IsOptional()
    visibility?: PostVisibility;
}
