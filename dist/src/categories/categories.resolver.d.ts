import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    recommendCategories(recommendCategoriesArgs: RecommendCategoriesArgs): Promise<OffsetPaginatedCategory>;
    relatedCategories(content: string): Promise<Category[]>;
}
