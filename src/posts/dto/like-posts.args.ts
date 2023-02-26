import { ArgsType, PickType } from '@nestjs/graphql';
import { PostsArgs } from './posts.args';

@ArgsType()
export class LikePostsArgs extends PickType(PostsArgs, [
    'offset',
    'limit',
] as const) {}
