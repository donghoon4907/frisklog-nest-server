import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsArgs } from './dto/posts.args';
import { OffsetPaginatedPost } from './dto/posts.response';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CategoryPostsArgs } from './dto/category-posts.args';
import { LikePostsArgs } from './dto/like-posts.args';
import { FollowingPostsArgs } from './dto/following-posts.args';
import { UpdatePostInput } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CategoryRepository } from '../categories/category.repository';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly categoriesRepository: CategoryRepository,
    ) {}

    async posts(postsArgs: PostsArgs): Promise<OffsetPaginatedPost> {
        const { offset, limit, searchKeyword, userId } = postsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likeCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .leftJoinAndSelect('post.likers', 'likers')
            .leftJoinAndSelect('post.categories', 'categories')
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);

        if (searchKeyword) {
            qb.andWhere('post.content like :searchKeyword', {
                searchKeyword: `%${searchKeyword}%`,
            });
        }

        if (userId) {
            qb.andWhere('user.id = :userId', { userId });
        }

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async findOneById(id: string): Promise<Post> {
        return this.postsRepository.findOneBy({ id: parseInt(id, 10) });
    }

    async findOne(id: string): Promise<Post> {
        return this.postsRepository.findOne({
            where: { id: parseInt(id, 10) },
            relations: {
                likers: true,
            },
        });
    }

    async categoryPosts(
        categoryPostsArgs: CategoryPostsArgs,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, category } = categoryPostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.categories', 'categories')
            .loadRelationCountAndMap('post.likeCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('categories.content = :category', {
                category,
            });

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async likePosts(
        likePostsArgs: LikePostsArgs,
        authId: number,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, userId } = likePostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.likers', 'likers')
            .loadRelationCountAndMap('post.likeCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('likers.id = :authId', { authId });

        if (userId) {
            qb.where('user.id = :userId', {
                userId,
            });
        }

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async followingPosts(
        followingPostArgs: FollowingPostsArgs,
        authId: number,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, userId } = followingPostArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('user.followers', 'followers')
            .loadRelationCountAndMap('post.likeCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('followers.id = :authId', { authId });

        if (userId) {
            qb.where('user.id = :userId', {
                userId,
            });
        }

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async create(createPostInput: CreatePostDto, user: User): Promise<Post> {
        const { content, categories } = createPostInput;

        const post = new Post();

        post.content = content;

        post.user = user;

        post.categories = [];

        for (let i = 0; i < categories.length; i++) {
            const category = await this.categoriesRepository.findOrCreate(
                categories[i],
            );

            post.categories.push(category);
        }

        return this.postsRepository.save(post);
    }

    async update(updatePostInput: UpdatePostInput, post: Post): Promise<Post> {
        const { content, categories } = updatePostInput;

        post.content = content;

        post.categories = [];

        for (let i = 0; i < categories.length; i++) {
            const category = await this.categoriesRepository.findOrCreate(
                categories[i],
            );

            post.categories.push(category);
        }

        return this.postsRepository.save(post);
    }

    async delete(post: Post): Promise<Post> {
        return this.postsRepository.softRemove(post);
    }

    async like(me: User, post: Post): Promise<Post> {
        post.likers.push(me);

        return this.postsRepository.save(post);
    }

    async unlike(me: User, post: Post): Promise<Post> {
        post.likers = post.likers.filter((user) => user.id !== me.id);

        return this.postsRepository.save(post);
    }
}
