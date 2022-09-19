import { Injectable } from '@nestjs/common';

import { Category } from './category.entity';
import { Post } from '../posts/post.entity';
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
            .leftJoin('category.posts', 'posts')
            .loadRelationCountAndMap('category.postCount', 'category.posts')
            .limit(limit)
            .offset(offset)
            .groupBy('category.id')
            .orderBy('postCount', 'DESC')
            .getManyAndCount();

        const paginator = new OffsetPaginator<Category>(offset, limit);

        return paginator.response(recommendCategories, total);
    }
}
