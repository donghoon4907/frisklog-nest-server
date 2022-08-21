import { ArgsType, PickType } from '@nestjs/graphql';

import { PostsArgs } from './posts.args';

@ArgsType()
export class FollowingPostsArgs extends PickType(PostsArgs, [
    'offset',
    'limit',
    'userId',
] as const) {}
{
}
