import { Field, ArgsType, Int, ID } from '@nestjs/graphql';
import { Min, Max, IsOptional } from 'class-validator';

@ArgsType()
export class PostsArgs {
    @Field(() => Int)
    offset = 0;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 12;

    @Field({ description: '포스트 검색어', nullable: true })
    @IsOptional()
    searchKeyword?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    userId?: string;
}
