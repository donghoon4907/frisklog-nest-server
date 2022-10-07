import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
// import { CategoryRepository } from '../categories/category.repository';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        @Inject(forwardRef(() => CategoriesService))
        private readonly categoriesService: CategoriesService, // private readonly categoriesRepository: CategoryRepository,
    ) {}

    async posts(postsArgs: PostsArgs): Promise<OffsetPaginatedPost> {
        const { offset, limit, searchKeyword, userId } = postsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
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

    async findById(id: string): Promise<Post> {
        return this.postsRepository.findOneBy({ id });
    }

    async categoryPosts(
        categoryPostsArgs: CategoryPostsArgs,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, category } = categoryPostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.categories', 'categories')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
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
        authId: string,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, userId } = likePostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.likers', 'likers')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
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
        authId: string,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, userId } = followingPostArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('user.followers', 'followers')
            .innerJoinAndSelect('followers.requester', 'requester')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('requester.id = :authId', { authId })
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);

        if (userId) {
            qb.andWhere('user.id = :userId', {
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

        return this.setPostCategories(post, categories);
    }

    async update(updatePostInput: UpdatePostInput, post: Post): Promise<Post> {
        const { content, categories } = updatePostInput;

        post.content = content;

        return this.setPostCategories(post, categories);
    }

    async setPostCategories(post: Post, categories: string[]) {
        const postCategories = await post.categories;

        postCategories.splice(0, postCategories.length);

        for (let i = 0; i < categories.length; i++) {
            const category = await this.categoriesService.findOrCreate(
                categories[i],
            );

            if (category) {
                postCategories.push(category);
            }
        }

        return this.postsRepository.save(post);
    }

    async delete(post: Post): Promise<Post> {
        return this.postsRepository.softRemove(post);
    }

    async like(post: Post, me: User): Promise<Post> {
        (await post.likers).push(me);

        await this.postsRepository.save(post);

        return post;
    }

    async unlike(post: Post, me: User): Promise<Post> {
        const likers = await post.likers;

        const index = likers.findIndex((liker) => liker.id == me.id);

        if (index !== -1) {
            likers.splice(index, 1);

            await this.postsRepository.save(post);
        }

        return post;
    }

    async isLiked(postId: string, authId: string) {
        const isLiked = await this.postsRepository.findOne({
            where: {
                likers: {
                    id: authId,
                },
                id: postId,
            },
        });

        return isLiked !== null;
    }
}
