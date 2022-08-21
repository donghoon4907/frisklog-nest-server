import { ArgsType, PickType } from '@nestjs/graphql';

import { UsersArgs } from './users.args';

@ArgsType()
export class FollowingsArgs extends PickType(UsersArgs, [
    'limit',
    'offset',
    'order',
] as const) {}