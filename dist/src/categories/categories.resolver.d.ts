import { CategoriesService } from './categories.service';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';
import { CategoriesArgs } from './dto/categories.args';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    categories(categoriesArgs: CategoriesArgs): Promise<OffsetPaginatedCategory>;
    recommendCategories(recommendCategoriesArgs: RecommendCategoriesArgs): Promise<OffsetPaginatedCategory>;
    relatedCategories(content: string): Promise<any[]>;
}
