import { ObjectType } from '@nestjs/graphql';

import { OffsetPaginated } from '../../common/paging/offset/offset.paginated';
import { Photo } from '../photo.entity';

@ObjectType()
export class OffsetPaginatedPhoto extends OffsetPaginated(Photo) {}
