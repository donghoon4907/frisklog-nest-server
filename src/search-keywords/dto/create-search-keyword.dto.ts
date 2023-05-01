import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { SearchKeyword } from '../search-keywords.entity';

@InputType()
export class CreateSearchKeywordDto extends PickType(
    SearchKeyword,
    ['keyword', 'ip'],
    InputType,
) {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    userId?: string;
}
