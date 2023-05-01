import { Repository } from 'typeorm';
import { CreateSearchKeywordDto } from './dto/create-search-keyword.dto';
import { SearchKeyword } from './search-keywords.entity';
export declare class SearchKeywordsService {
    private readonly searchKeywordsRepository;
    constructor(searchKeywordsRepository: Repository<SearchKeyword>);
    createSearchKeyword(createSearchKeywordDto: CreateSearchKeywordDto): Promise<SearchKeyword>;
}
