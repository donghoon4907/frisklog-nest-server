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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./category.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
const category_repository_1 = require("./category.repository");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async recommendCategories(recommendCategoriesArgs) {
        const { limit, offset } = recommendCategoriesArgs;
        const [recommendCategories, total] = await this.categoriesRepository
            .createQueryBuilder('category')
            .addSelect('COUNT(posts.id) as postCount')
            .leftJoin('category.posts', 'posts')
            .loadRelationCountAndMap('category.postCount', 'category.posts')
            .limit(limit)
            .offset(offset)
            .groupBy('category.id')
            .orderBy('postCount', 'DESC')
            .getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(recommendCategories, total);
    }
    findById(id) {
        return this.categoriesRepository.findOne({
            where: { id },
        });
    }
    findByContent(content) {
        return this.categoriesRepository.findOne({
            where: { content },
        });
    }
    createCategory(content) {
        const category = this.categoriesRepository.create({ content });
        return this.categoriesRepository.save(category);
    }
    async findOrCreate(content) {
        let category = await this.findByContent(content);
        if (category === null) {
            category = await this.createCategory(content);
        }
        return category;
    }
    async relatedCategories(category) {
        const posts = await category.posts;
        const relatedCategories = {};
        for (let i = 0; i < posts.length; i++) {
            const postCategories = await posts[i].categories;
            for (let j = 0; j < postCategories.length; j++) {
                const content = postCategories[j].content;
                if (content === category.content) {
                    continue;
                }
                if (relatedCategories.hasOwnProperty(content)) {
                    relatedCategories[content] += 1;
                }
                else {
                    relatedCategories[content] = 1;
                }
            }
        }
        const sortedCategories = Object.keys(relatedCategories).sort((a, b) => {
            if (relatedCategories[a] > relatedCategories[b]) {
                return -1;
            }
            else {
                return 1;
            }
        });
        return sortedCategories.map((content) => {
            const entity = new category_entity_1.Category();
            entity.content = content;
            entity.postCount = relatedCategories[content];
            return entity;
        });
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map