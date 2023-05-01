import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsService } from './posts.service';
import { OffsetPaginatedPost } from './dto/posts.response';
import { PostsArgs } from './dto/posts.args';
import { CategoryPostsArgs } from './dto/category-posts.args';
import { LikePostsArgs } from './dto/like-posts.args';
import { FollowingPostsArgs } from './dto/following-posts.args';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RemovedPostsArgs } from './dto/removed-posts.args';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    posts(ip: string, me: User, postsArgs: PostsArgs): Promise<OffsetPaginatedPost>;
    categoryPosts(categoryPostsArgs: CategoryPostsArgs): Promise<OffsetPaginatedPost>;
    likePosts(me: User, likePostsArgs: LikePostsArgs): Promise<OffsetPaginatedPost>;
    followingPosts(me: User, followingPostArgs: FollowingPostsArgs): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Post>>;
    removedPosts(me: User, removedPostsArgs: RemovedPostsArgs): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Post>>;
    addPost(me: User, createPostDto: CreatePostDto): Promise<Post>;
    updatePost(updatePostDto: UpdatePostDto): Promise<Post>;
    deletePost(id: string): Promise<Post>;
    restorePost(id: string): Promise<Post>;
    like(me: User, id: string): Promise<boolean>;
    unlike(me: User, id: string): Promise<boolean>;
    isLiked(post: Post, ctx: any): Promise<boolean>;
}
