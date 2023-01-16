import { DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoryRepository extends Repository<Category> {
    private dataSource;
    constructor(dataSource: DataSource);
}
