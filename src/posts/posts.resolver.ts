import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Parent,
    Context,
} from '@nestjs/graphql';
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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { decodeToken, getBearerToken } from 'src/common/context';

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

    @Mutation((returns) => Post)
    @UseGuards(AuthGuard)
    addPost(@AuthUser() me: User, @Args('input') createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto, me);
    }

    @Mutation((returns) => Post)
    @UseGuards(AuthGuard)
    async updatePost(@Args('input') updatePostDto: UpdatePostDto) {
        const { id, data } = updatePostDto;

        const post = await this.postsService.findById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        return this.postsService.update(data, post);
    }

    @Mutation((returns) => Post)
    @UseGuards(AuthGuard)
    async deletePost(@Args('id') id: string) {
        const post = await this.postsService.findById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        return this.postsService.delete(post);
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async like(@AuthUser() me: User, @Args('id') id: string) {
        const post = await this.postsService.findById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        await this.postsService.like(post, me);

        return true;
    }

    @Mutation((returns) => Boolean)
    @UseGuards(AuthGuard)
    async unlike(@AuthUser() me: User, @Args('id') id: string) {
        const post = await this.postsService.findById(id);

        if (post === null) {
            throw new ForbiddenException('존재하지 않는 포스트입니다.');
        }

        await this.postsService.unlike(post, me);

        return true;
    }

    @ResolveField((returns) => Boolean)
    async isLiked(@Parent() post: Post, @Context() ctx: any) {
        const token = getBearerToken(ctx);

        if (token) {
            const { id } = decodeToken(token);

            if (id) {
                return this.postsService.isLiked(post.id, id);
            }
        } else {
            return false;
        }
    }
}
