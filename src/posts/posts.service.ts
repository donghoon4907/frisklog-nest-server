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
import { CategoriesService } from '../categories/categories.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RemovedPostsArgs } from './dto/removed-posts.args';
import { PostVisibility } from './post.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        @Inject(forwardRef(() => CategoriesService))
        private readonly categoriesService: CategoriesService,
        @Inject(forwardRef(() => NotificationsService))
        private readonly notificationsService: NotificationsService, // private readonly categoriesRepository: CategoryRepository,
    ) {}

    async posts(postsArgs: PostsArgs): Promise<OffsetPaginatedPost> {
        const { offset, limit, searchKeyword, userId, visibility } = postsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .orderBy('post.createdAt', 'DESC')
            .where('post.visibility = :visibility', {
                visibility: PostVisibility.PUBLIC,
            })
            .limit(limit)
            .offset(offset);

        if (searchKeyword) {
            qb.andWhere('post.content like :searchKeyword', {
                searchKeyword: `%${searchKeyword}%`,
            }).orWhere('user.nickname like :searchKeyword');
        }

        if (visibility) {
            qb.andWhere('post.visibility = :visibility', { visibility });
        }

        if (userId) {
            qb.andWhere('user.id = :userId', { userId });
        }

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async findById(id: string): Promise<Post> {
        return this.postsRepository.findOne({
            where: { id },
            withDeleted: true,
        });
    }

    async categoryPosts(
        categoryPostsArgs: CategoryPostsArgs,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit, category } = categoryPostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoin('post.categories', 'categories')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('categories.content = :category', {
                category,
            })
            .andWhere('post.visibility = :visibility', {
                visibility: PostVisibility.PUBLIC,
            })
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async likePosts(
        likePostsArgs: LikePostsArgs,
        authId: string,
    ): Promise<OffsetPaginatedPost> {
        const { offset, limit } = likePostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.likers', 'likers')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('likers.id = :authId', { authId })
            .andWhere('post.visibility = :visibility', {
                visibility: PostVisibility.PUBLIC,
            })
            .orderBy('post.createdAt', 'DESC');

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async followingPosts(
        followingPostArgs: FollowingPostsArgs,
        authId: string,
    ) {
        const { offset, limit, userId } = followingPostArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('user.followers', 'followers')
            .innerJoinAndSelect('followers.requester', 'requester')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('requester.id = :authId', { authId })
            .andWhere('post.visibility = :visibility', {
                visibility: PostVisibility.PUBLIC,
            })
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

    async removedPosts(removedPostsArgs: RemovedPostsArgs, authId: string) {
        const { offset, limit } = removedPostsArgs;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('post.deletedAt is not null')
            .andWhere('user.id = :authId', { authId })
            .orderBy('post.createdAt', 'DESC')
            .withDeleted()
            .limit(limit)
            .offset(offset);

        const [posts, total] = await qb.getManyAndCount();

        const paginator = new OffsetPaginator<Post>(offset, limit);

        return paginator.response(posts, total);
    }

    async create(createPostInput: CreatePostDto, user: User) {
        const { content, categories, visibility } = createPostInput;

        const post = new Post();

        post.content = content;

        post.visibility = visibility;

        post.user = Promise.resolve(user);

        await this.setPostCategories(post, categories);

        const followers = await user.followers;

        for (let i = 0; i < followers.length; i++) {
            const target = await followers[i].requester;
            // 팔로우 포스트 알림 설정한 경우
            if (target.receivePostNotification) {
                await this.notificationsService.createNotification(
                    {
                        content: '새로운 포스트 작성',
                        url: `/user/${user.id}`,
                    },
                    user,
                    target,
                );
            }
        }

        return post;
    }

    async update(updatePostInput: UpdatePostInput, post: Post) {
        const { content, categories, visibility } = updatePostInput;

        post.content = content;

        post.visibility = visibility;

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

        await this.postsRepository.save(post);

        return post;
    }

    delete(post: Post) {
        return this.postsRepository.softRemove(post);
    }

    async restore(post: Post) {
        await this.postsRepository.restore(post.id);

        return post;
    }

    async like(post: Post, me: User) {
        await this.postsRepository
            .createQueryBuilder('post')
            .relation('likers')
            .of(post)
            .add(me);

        const writer = await post.user;

        if (writer.receiveLikeNotification) {
            await this.notificationsService.createNotification(
                {
                    content: `나의 포스트에 좋아요`,
                    url: `/user/${me.id}`,
                },
                me,
                writer,
            );
        }
    }

    unlike(post: Post, me: User) {
        return this.postsRepository
            .createQueryBuilder('post')
            .relation('likers')
            .of(post)
            .remove(me);
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
