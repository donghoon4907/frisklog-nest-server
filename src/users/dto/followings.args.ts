import { Field, ArgsType, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { Order } from '../../common/paging/cursor/cursor.interface';

@ArgsType()
export class FollowingsArgs {
    @Field((type) => ID)
    id: number;

    @Field({ nullable: true })
    @IsOptional()
    first?: number;

    @Field({ nullable: true })
    @IsOptional()
    last?: number;

    @Field({ nullable: true })
    @IsOptional()
    before?: string;

    @Field({ nullable: true })
    @IsOptional()
    after?: string;

    // @Field(() => Order, { nullable: true })
    // @IsOptional()
    // order?: Order;
}
