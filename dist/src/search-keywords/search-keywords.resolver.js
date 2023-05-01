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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchKeywordsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const search_keywords_entity_1 = require("./search-keywords.entity");
const search_keywords_service_1 = require("./search-keywords.service");
let SearchKeywordsResolver = class SearchKeywordsResolver {
    constructor(searchKeywordsService) {
        this.searchKeywordsService = searchKeywordsService;
    }
};
SearchKeywordsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => search_keywords_entity_1.SearchKeyword),
    __metadata("design:paramtypes", [search_keywords_service_1.SearchKeywordsService])
], SearchKeywordsResolver);
exports.SearchKeywordsResolver = SearchKeywordsResolver;
//# sourceMappingURL=search-keywords.resolver.js.map