import { Repository } from 'typeorm';
import { CreateSearchKeywordDto } from './dto/create-search-keyword.dto';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
import { SearchKeyword } from './search-keywords.entity';
import { SearchLogsArgs } from './dto/search-logs.args';
export declare class SearchKeywordsService {
    private readonly searchKeywordsRepository;
    constructor(searchKeywordsRepository: Repository<SearchKeyword>);
    searchKeywords(searchKeywordsArgs: SearchKeywordsArgs): Promise<SearchKeyword[]>;
    searchLogs(searchLogsArgs: SearchLogsArgs, authId: string): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<SearchKeyword>>;
    createSearchKeyword(createSearchKeywordDto: CreateSearchKeywordDto): Promise<SearchKeyword>;
}
