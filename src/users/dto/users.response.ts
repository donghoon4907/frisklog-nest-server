import { ObjectType } from '@nestjs/graphql';

import { Paginated as OffsetPaginated } from '../../common/paginate/offset-based.paginate';
import { Paginated as CursorPaginated } from '../../common/paginate/cursor-based.paginate';
import { User } from '../models/user.model';

@ObjectType()
export class OffsetPaginatedUser extends OffsetPaginated(User) {}

@ObjectType()
export class CursorPaginatedUser extends CursorPaginated(User) {}
