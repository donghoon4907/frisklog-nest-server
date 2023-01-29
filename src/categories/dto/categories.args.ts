import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { OffsetPaginatedArgs } from 'src/common/paging/offset/offset.args';

@ArgsType()
export class CategoriesArgs extends OffsetPaginatedArgs {
    @Field({ description: '검색어', nullable: true })
    @IsOptional()
    searchKeyword?: string;
}
