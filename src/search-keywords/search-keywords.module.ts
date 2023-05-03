import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchKeyword } from './search-keywords.entity';
import { User } from '../users/user.entity';
import { SearchKeywordsResolver } from './search-keywords.resolver';
import { SearchKeywordsService } from './search-keywords.service';

@Module({
    imports: [TypeOrmModule.forFeature([SearchKeyword, User])],
    providers: [SearchKeywordsResolver, SearchKeywordsService],
    exports: [SearchKeywordsService],
})
export class SearchKeywordsModule {}
