import { Resolver, Query, Args } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';

@Resolver((of) => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query((returns) => OffsetPaginatedCategory)
    recommendCategories(
        @Args() recommendCategoriesArgs: RecommendCategoriesArgs,
    ) {
        return this.categoriesService.recommendCategories(
            recommendCategoriesArgs,
        );
    }
}
