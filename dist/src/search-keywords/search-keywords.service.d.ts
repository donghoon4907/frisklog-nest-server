import { Repository } from 'typeorm';
import { CreateSearchKeywordDto } from './dto/create-search-keyword.dto';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
import { SearchKeyword } from './search-keywords.entity';
export declare class SearchKeywordsService {
    private readonly searchKeywordsRepository;
    constructor(searchKeywordsRepository: Repository<SearchKeyword>);
    searchKeywords(searchKeywordsArgs: SearchKeywordsArgs): Promise<SearchKeyword[]>;
    createSearchKeyword(createSearchKeywordDto: CreateSearchKeywordDto): Promise<SearchKeyword>;
}
