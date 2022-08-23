import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { Category } from '../category.entity';

@ObjectType()
export class OffsetPaginatedCategory extends OffsetPaginated(Category) {}
