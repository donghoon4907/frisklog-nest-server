import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { CursorPaginated } from '../../common/paging/cursor/cursor.paginated';
import { User } from '../user.entity';

@ObjectType()
export class OffsetPaginatedUser extends OffsetPaginated(User) {}

@ObjectType()
export class CursorPaginatedUser extends CursorPaginated(User) {}
