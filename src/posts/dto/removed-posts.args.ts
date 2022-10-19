import { ArgsType, PickType } from '@nestjs/graphql';

import { PostsArgs } from './posts.args';

@ArgsType()
export class RemovedPostsArgs extends PickType(PostsArgs, [
    'offset',
    'limit',
] as const) {}
{
}
