import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CreateSearchKeywordDto } from './dto/create-search-keyword.dto';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
import { SearchKeyword } from './search-keywords.entity';
import { SearchLogsArgs } from './dto/search-logs.args';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';

@Injectable()
export class SearchKeywordsService {
    constructor(
        @InjectRepository(SearchKeyword)
        private readonly searchKeywordsRepository: Repository<SearchKeyword>,
    ) {}

    async searchKeywords(searchKeywordsArgs: SearchKeywordsArgs) {
        const { limit } = searchKeywordsArgs;

        const searchKeywords = await this.searchKeywordsRepository
            .createQueryBuilder('searchKeywords')
            .select([
                'searchKeywords.id as id',
                'searchKeywords.keyword as keyword',
            ])
            .addSelect('COUNT(searchKeywords.keyword) as searchCount')
            .limit(limit)
            .groupBy('searchKeywords.keyword')
            .orderBy('searchCount', 'DESC')
            .getRawMany();

        return plainToInstance(SearchKeyword, searchKeywords);
    }

    async searchLogs(searchLogsArgs: SearchLogsArgs, authId: string) {
        const { offset, limit } = searchLogsArgs;

        const [searchLogs, total] = await this.searchKeywordsRepository
            .createQueryBuilder('searchKeywords')
            .where('searchKeywords.userId = :authId', { authId })
            .orderBy('searchKeywords.createdAt', 'DESC')
            .limit(limit)
            .offset(offset)
            .getManyAndCount();

        const paginator = new OffsetPaginator<SearchKeyword>(offset, limit);

        return paginator.response(searchLogs, total);
    }

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
