import { ObjectType } from '@nestjs/graphql';

import { Paginated as OffsetPaginated } from '../../common/paginate/offset/paginated';
import { Paginated as CursorPaginated } from '../../common/paginate/cursor/cursor.paginate';
import { User } from '../user.entity';

@ObjectType()
export class OffsetPaginatedUser extends OffsetPaginated(User) {}

@ObjectType()
export class CursorPaginatedUser extends CursorPaginated(User) {}
