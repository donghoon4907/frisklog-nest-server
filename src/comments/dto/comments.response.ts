import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { Comment } from '../comment.entity';

@ObjectType()
export class OffsetPaginatedComment extends OffsetPaginated(Comment) {}
