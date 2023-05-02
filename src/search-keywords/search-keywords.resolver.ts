import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchKeyword } from './search-keywords.entity';
import { SearchKeywordsService } from './search-keywords.service';
import { SearchKeywordsArgs } from './dto/search-keywords.args';

@Resolver((of) => SearchKeyword)
export class SearchKeywordsResolver {
    constructor(
        private readonly searchKeywordsService: SearchKeywordsService,
    ) {}

    @Query((returns) => [SearchKeyword])
    searchKeywords(@Args() searchKeywordsArgs: SearchKeywordsArgs) {
        return this.searchKeywordsService.searchKeywords(searchKeywordsArgs);
    }
}
