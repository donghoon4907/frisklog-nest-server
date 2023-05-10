import { SearchKeyword } from './search-keywords.entity';
import { SearchKeywordsService } from './search-keywords.service';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
import { User } from '../users/user.entity';
import { SearchLogsArgs } from './dto/search-logs.args';
export declare class SearchKeywordsResolver {
    private readonly searchKeywordsService;
    constructor(searchKeywordsService: SearchKeywordsService);
    searchKeywords(searchKeywordsArgs: SearchKeywordsArgs): Promise<SearchKeyword[]>;
    searchLogs(me: User, searchLogsArgs: SearchLogsArgs): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<SearchKeyword>>;
    deleteSearchKeyword(id: string): Promise<SearchKeyword>;
}
