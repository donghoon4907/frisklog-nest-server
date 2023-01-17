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
            .addSelect('COUNT(posts.id) as postCount')
            .innerJoin('category.posts', 'posts')
            .loadRelationCountAndMap('category.postCount', 'category.posts')
            .limit(limit)
            .offset(offset)
            .groupBy('category.id')
            .orderBy('postCount', 'DESC')
            .getManyAndCount();

        const paginator = new OffsetPaginator<Category>(offset, limit);

        return paginator.response(recommendCategories, total);
    }

    findById(id: string) {
        return this.categoriesRepository.findOne({
            where: { id },
        });
    }

    findByContent(content: string) {
        return this.categoriesRepository.findOne({
            where: { content },
        });
    }

    createCategory(content: string) {
        const category = this.categoriesRepository.create({ content });

        return this.categoriesRepository.save(category);
    }

    async findOrCreate(content: string) {
        let category = await this.findByContent(content);

        if (category === null) {
            category = await this.createCategory(content);
        }

        return category;
    }

    async relatedCategories(category: Category) {
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
                } else {
                    relatedCategories[content] = 1;
                }
            }
        }

        const sortedCategories = Object.keys(relatedCategories).sort((a, b) => {
            if (relatedCategories[a] > relatedCategories[b]) {
                return -1;
            } else {
                return 1;
            }
        });

        return sortedCategories.map((content) => {
            const entity = new Category();

            entity.content = content;

            entity.postCount = relatedCategories[content];

            return entity;
        });
    }
}
