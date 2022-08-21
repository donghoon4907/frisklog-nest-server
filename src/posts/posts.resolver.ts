import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsService } from './posts.service';
import { OffsetPaginatedPost } from './dto/posts.response';
import { PostsArgs } from './dto/posts.args';
import { CategoryPostsArgs } from './dto/category-posts.args';
import { LikePostsArgs } from './dto/like-posts.args';
import { FollowingPostsArgs } from './dto/following-posts.args';
import { AuthGuard } from '../users/auth/auth.guard';
import { AuthUser } from '../users/auth/auth.decorator';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver((of) => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Query((returns) => OffsetPaginatedPost)
    posts(@Args() postsArgs: PostsArgs) {
        return this.postsService.posts(postsArgs);
    }

    @Query((returns) => OffsetPaginatedPost)
    categoryPosts(@Args() categoryPostsArgs: CategoryPostsArgs) {
        return this.postsService.categoryPosts(categoryPostsArgs);
    }

    @Query((returns) => OffsetPaginatedPost)
    @UseGuards(AuthGuard)
    likePosts(@AuthUser() me: User, @Args() likePostsArgs: LikePostsArgs) {
        return this.postsService.likePosts(likePostsArgs, me.id);
    }

    @Query((returns) => OffsetPaginatedPost)
    @UseGuards(AuthGuard)
    followingPosts(
        @AuthUser() me: User,
        @Args() followingPostArgs: FollowingPostsArgs,
    ) {
        return this.postsService.followingPosts(followingPostArgs, me.id);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    addPost(
        @AuthUser() me: User,
        @Args('createPostInput') createPostInput: CreatePostInput,
    ) {
        return this.postsService.create(createPostInput, me.id);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async updatePost(
        @Args('updatePostInput') updatePostInput: UpdatePostInput,
    ) {
        const { id } = updatePostInput;

        const post = await this.postsService.findOneById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        return this.postsService.update(post, updatePostInput);
    }

    @Mutation((returns) => User)
    @UseGuards(AuthGuard)
    async deletePost(@Args('id') id: number) {
        const post = await this.postsService.findOneById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        return this.postsService.delete(post);
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async like(@AuthUser() me: User, @Args('id') id: number) {
        const post = await this.postsService.findOne(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        await this.postsService.like(me, post);

        return true;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async unlike(@AuthUser() me: User, @Args('id') id: number) {
        const post = await this.postsService.findOne(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        await this.postsService.unlike(me, post);

        return true;
    }
}
