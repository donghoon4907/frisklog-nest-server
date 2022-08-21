import { Field, ArgsType, PickType } from '@nestjs/graphql';
import { PostsArgs } from './posts.args';

@ArgsType()
export class CategoryPostsArgs extends PickType(PostsArgs, [
    'offset',
    'limit',
] as const) {
    @Field()
    category: string;
}
