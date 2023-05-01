import { Field, ArgsType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';
import { PostVisibility } from '../post.interface';

@ArgsType()
export class PostsArgs extends OffsetPaginatedArgs {
    @Field({ description: '포스트 검색어', nullable: true })
    @IsOptional()
    @IsString()
    searchKeyword?: string;

    @Field({ description: '작성자 ID', nullable: true })
    @IsOptional()
    @IsString()
    userId?: string;

    @Field({ description: '공개 여부', nullable: true })
    @IsOptional()
    @IsEnum(PostVisibility)
    visibility?: PostVisibility;

    @Field({ description: '사용자 IP', nullable: true })
    @IsOptional()
    @IsString()
    ip?: string;
}
