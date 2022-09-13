import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async findOrCreate(content: string) {
        let category = await this.findOne({
            where: { content },
        });

        if (category === null) {
            const newCategory = this.create({ content });

            category = await this.save(newCategory);
        }

        return category;
    }
}
