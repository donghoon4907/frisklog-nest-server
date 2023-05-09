"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchKeywordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const search_keywords_entity_1 = require("./search-keywords.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
let SearchKeywordsService = class SearchKeywordsService {
    constructor(searchKeywordsRepository) {
        this.searchKeywordsRepository = searchKeywordsRepository;
    }
    async searchKeywords(searchKeywordsArgs) {
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
        return (0, class_transformer_1.plainToInstance)(search_keywords_entity_1.SearchKeyword, searchKeywords);
    }
    async searchLogs(searchLogsArgs, authId) {
        const { offset, limit } = searchLogsArgs;
        const [searchLogs, total] = await this.searchKeywordsRepository
            .createQueryBuilder('searchKeywords')
            .where('searchKeywords.userId = :authId', { authId })
            .orderBy('searchKeywords.createdAt', 'DESC')
            .limit(limit)
            .offset(offset)
            .groupBy('searchKeywords.keyword')
            .getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(searchLogs, total);
    }
    async createSearchKeyword(createSearchKeywordDto) {
        const { keyword, ip, userId } = createSearchKeywordDto;
        const searchKeyword = new search_keywords_entity_1.SearchKeyword();
        searchKeyword.keyword = keyword;
        searchKeyword.ip = ip;
        searchKeyword.userId = userId;
        await this.searchKeywordsRepository.save(searchKeyword);
        return searchKeyword;
    }
};
SearchKeywordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(search_keywords_entity_1.SearchKeyword)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SearchKeywordsService);
exports.SearchKeywordsService = SearchKeywordsService;
//# sourceMappingURL=search-keywords.service.js.map