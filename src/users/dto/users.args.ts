import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';

@ArgsType()
export class UsersArgs extends OffsetPaginatedArgs {
    @Field({ description: '닉네임', nullable: true })
    @IsOptional()
    nickname?: string;
}
