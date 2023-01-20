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

        const relatedCategories = [];
        // 카테고리가 사용된 포스트에서 사용한 카테고리 구하기
        for (let i = 0; i < posts.length; i++) {
            const postCategories = await posts[i].categories;

            for (let j = 0; j < postCategories.length; j++) {
                // 동일한 카테고리 제외
                if (postCategories[j].id === category.id) {
                    continue;
                }
                // 이미 추가된 카테고리 제외
                if (!relatedCategories.includes(postCategories[j].id)) {
                    relatedCategories.push(postCategories[j].id);
                }
            }
        }
        // 카테고리 정보 로드
        for (let i = 0; i < relatedCategories.length; i++) {
            relatedCategories[i] = await this.categoriesRepository
                .createQueryBuilder('category')
                .innerJoin('category.posts', 'posts')
                .loadRelationCountAndMap('category.postCount', 'category.posts')
                .where('category.id = :id', { id: relatedCategories[i] })
                .getOne();
        }
        // 내림차순으로 정렬
        relatedCategories.sort((a, b) => b.postCount - a.postCount);

        return relatedCategories;
    }
}
