import { Injectable } from '@nestjs/common';

import { Category } from './category.entity';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoryRepository) {}

    async recommendCategories(
        recommendCategoriesArgs: RecommendCategoriesArgs,
    ): Promise<OffsetPaginatedCategory> {
        const { limit, offset } = recommendCategoriesArgs;

        const [recommendCategories, total] = await this.categoriesRepository
            .createQueryBuilder('category')
            .loadRelationCountAndMap('category.postCount', 'category.posts')
            .limit(limit)
            .offset(offset)
            .orderBy('category.postCount', 'DESC')
            .getManyAndCount();

        const paginator = new OffsetPaginator<Category>(offset, limit);

        return paginator.response(recommendCategories, total);
    }

    async category(content: string): Promise<Category> {
        return this.categoriesRepository.findOne({ where: { content } });
    }

    async create(content: string): Promise<Category> {
        const category = new Category();

        category.content = content;

        return this.categoriesRepository.save(category);
    }

    async findOrCreate(content: string): Promise<Category> {
        let category = await this.category(content);

        if (category === null) {
            category = await this.create(content);
        }

        return category;
    }

    async upsert(categories: string[]): Promise<Category[]> {
        const normalizeCategories = categories.map((category) => ({
            content: category,
        }));

        const { raw } = await this.categoriesRepository.upsert(
            normalizeCategories,
            ['content'],
        );

        return raw;
    }
}
