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
exports.CategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const categories_service_1 = require("./categories.service");
const category_entity_1 = require("./category.entity");
const categories_response_1 = require("./dto/categories.response");
const recommend_categories_args_1 = require("./dto/recommend-categories.args");
let CategoriesResolver = class CategoriesResolver {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    recommendCategories(recommendCategoriesArgs) {
        return this.categoriesService.recommendCategories(recommendCategoriesArgs);
    }
    async relatedCategories(content) {
        const category = await this.categoriesService.findByContent(content);
        if (category === null) {
            return [];
        }
        return this.categoriesService.relatedCategories(category);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => categories_response_1.OffsetPaginatedCategory),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recommend_categories_args_1.RecommendCategoriesArgs]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "recommendCategories", null);
__decorate([
    (0, graphql_1.Query)((returns) => [category_entity_1.Category]),
    __param(0, (0, graphql_1.Args)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "relatedCategories", null);
CategoriesResolver = __decorate([
    (0, graphql_1.Resolver)((of) => category_entity_1.Category),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
exports.CategoriesResolver = CategoriesResolver;
//# sourceMappingURL=categories.resolver.js.map