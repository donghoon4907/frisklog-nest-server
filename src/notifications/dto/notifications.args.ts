import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';

@ArgsType()
export class NotificationsArgs extends OffsetPaginatedArgs {}
