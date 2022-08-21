import { Resolver } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Resolver((of) => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}
}
