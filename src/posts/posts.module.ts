import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { Category } from '../categories/category.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post, Category])],
    providers: [PostsService, PostsResolver],
})
export class PostsModule {}
