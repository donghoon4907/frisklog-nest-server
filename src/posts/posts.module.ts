import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { Category } from '../categories/category.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([User, Post, Category])],
    providers: [PostsService, PostsResolver],
})
export class PostsModule {}
