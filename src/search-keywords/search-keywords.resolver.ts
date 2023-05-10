import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { SearchKeyword } from './search-keywords.entity';
import { SearchKeywordsService } from './search-keywords.service';
import { SearchKeywordsArgs } from './dto/search-keywords.args';
import { OffsetPaginatedSearchKeyword } from './dto/search-keywords.response';
import { AuthGuard } from '../users/auth/auth.guard';
import { AuthUser } from '../users/auth/auth.decorator';
import { User } from '../users/user.entity';
import { SearchLogsArgs } from './dto/search-logs.args';

@Resolver((of) => SearchKeyword)
export class SearchKeywordsResolver {
    constructor(
        private readonly searchKeywordsService: SearchKeywordsService,
    ) {}

    @Query((returns) => [SearchKeyword])
    searchKeywords(@Args() searchKeywordsArgs: SearchKeywordsArgs) {
        return this.searchKeywordsService.searchKeywords(searchKeywordsArgs);
    }

    @Query((returns) => OffsetPaginatedSearchKeyword)
    @UseGuards(AuthGuard)
    searchLogs(@AuthUser() me: User, @Args() searchLogsArgs: SearchLogsArgs) {
        return this.searchKeywordsService.searchLogs(searchLogsArgs, me.id);
    }

    @Mutation((returns) => SearchKeyword)
    @UseGuards(AuthGuard)
    async deleteSearchKeyword(@Args('id') id: string) {
        const searchkeyword = await this.searchKeywordsService.findById(id);

        if (searchkeyword === null) {
            throw new ForbiddenException('존재하지 않는 검색어입니다.');
        }

        return this.searchKeywordsService.delete(searchkeyword);
    }
}
