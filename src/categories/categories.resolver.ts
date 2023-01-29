import { Resolver, Query, Args } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';
import { CategoriesArgs } from './dto/categories.args';

@Resolver((of) => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query((returns) => OffsetPaginatedCategory)
    categories(@Args() categoriesArgs: CategoriesArgs) {
        return this.categoriesService.categories(categoriesArgs);
    }

    @Query((returns) => OffsetPaginatedCategory)
    recommendCategories(
        @Args() recommendCategoriesArgs: RecommendCategoriesArgs,
    ) {
        return this.categoriesService.recommendCategories(
            recommendCategoriesArgs,
        );
    }

    @Query((returns) => [Category])
    async relatedCategories(@Args('content') content: string) {
        const category = await this.categoriesService.findByContent(content);

        if (category === null) {
            return [];
        }

        return this.categoriesService.relatedCategories(category);
    }
}
