import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
// import { CategoryRepository } from 'src/categories/category.repository';
import { CategoriesModule } from '../categories/categories.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Post]),
        forwardRef(() => CategoriesModule),
        forwardRef(() => NotificationsModule),
    ],
    providers: [
        PostsService,
        PostsResolver,
        // CategoryRepository
    ],
})
export class PostsModule {}
