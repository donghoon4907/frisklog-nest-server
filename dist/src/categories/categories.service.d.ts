import { Category } from './category.entity';
import { OffsetPaginatedCategory } from './dto/categories.response';
import { RecommendCategoriesArgs } from './dto/recommend-categories.args';
import { CategoryRepository } from './category.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoryRepository);
    recommendCategories(recommendCategoriesArgs: RecommendCategoriesArgs): Promise<OffsetPaginatedCategory>;
    findById(id: string): Promise<Category>;
    findByContent(content: string): Promise<Category>;
    createCategory(content: string): Promise<Category>;
    findOrCreate(content: string): Promise<Category>;
    relatedCategories(category: Category): Promise<Category[]>;
}
