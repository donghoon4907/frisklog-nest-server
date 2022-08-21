import { ArgsType, PickType } from '@nestjs/graphql';

import { UsersArgs } from './users.args';

@ArgsType()
export class RecommendersArgs extends PickType(UsersArgs, [
    'limit',
    'offset',
] as const) {}
