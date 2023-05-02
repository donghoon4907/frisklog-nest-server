import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { SearchKeyword } from '../search-keywords.entity';

@ObjectType()
export class OffsetPaginatedSearchKeyword extends OffsetPaginated(
    SearchKeyword,
) {}
