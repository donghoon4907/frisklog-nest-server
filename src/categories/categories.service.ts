import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    async category(content: string): Promise<Category> {
        return this.categoriesRepository.findOne({ where: { content } });
    }

    async create(content: string): Promise<Category> {
        const category = new Category();

        category.content = content;

        return this.categoriesRepository.save(category);
    }

    async findOrCreate(content: string): Promise<Category> {
        let category = await this.category(content);

        if (category === null) {
            category = await this.create(content);
        }

        return category;
    }

    async upsert(categories: string[]): Promise<Category[]> {
        const normalizeCategories = categories.map((category) => ({
            content: category,
        }));

        const { raw } = await this.categoriesRepository.upsert(
            normalizeCategories,
            ['content'],
        );

        return raw;
    }
}
