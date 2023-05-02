import { SearchKeyword } from './search-keywords.entity';
import { SearchKeywordsService } from './search-keywords.service';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
export declare class SearchKeywordsResolver {
    private readonly searchKeywordsService;
    constructor(searchKeywordsService: SearchKeywordsService);
    searchKeywords(searchKeywordsArgs: SearchKeywordsArgs): Promise<SearchKeyword[]>;
}
