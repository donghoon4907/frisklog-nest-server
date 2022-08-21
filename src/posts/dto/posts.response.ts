import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { Post } from '../post.entity';

@ObjectType()
export class OffsetPaginatedPost extends OffsetPaginated(Post) {}
