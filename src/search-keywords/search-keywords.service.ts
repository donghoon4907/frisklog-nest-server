import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSearchKeywordDto } from './dto/create-search-keyword.dto';
import { SearchKeyword } from './search-keywords.entity';

@Injectable()
export class SearchKeywordsService {
    constructor(
        @InjectRepository(SearchKeyword)
        private readonly searchKeywordsRepository: Repository<SearchKeyword>,
    ) {}

    async createSearchKeyword(createSearchKeywordDto: CreateSearchKeywordDto) {
        const { keyword, ip, userId } = createSearchKeywordDto;

        const searchKeyword = new SearchKeyword();

        searchKeyword.keyword = keyword;

        searchKeyword.ip = ip;

        searchKeyword.userId = userId;

        await this.searchKeywordsRepository.save(searchKeyword);

        return searchKeyword;
    }
}
