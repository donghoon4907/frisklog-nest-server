import { ArgsType } from '@nestjs/graphql';

import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';

@ArgsType()
export class SearchKeywordsArgs extends OffsetPaginatedArgs {}
