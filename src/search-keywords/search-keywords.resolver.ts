import { Resolver } from '@nestjs/graphql';

import { SearchKeyword } from './search-keywords.entity';
import { SearchKeywordsService } from './search-keywords.service';

@Resolver((of) => SearchKeyword)
export class SearchKeywordsResolver {
    constructor(
        private readonly searchKeywordsService: SearchKeywordsService,
    ) {}
}
