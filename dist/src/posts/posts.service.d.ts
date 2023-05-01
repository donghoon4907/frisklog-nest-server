import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsArgs } from './dto/posts.args';
import { OffsetPaginatedPost } from './dto/posts.response';
import { CategoryPostsArgs } from './dto/category-posts.args';
import { LikePostsArgs } from './dto/like-posts.args';
import { FollowingPostsArgs } from './dto/following-posts.args';
import { UpdatePostInput } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CategoriesService } from '../categories/categories.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RemovedPostsArgs } from './dto/removed-posts.args';
import { SearchKeywordsService } from '../search-keywords/search-keywords.service';
export declare class PostsService {
    private readonly postsRepository;
    private readonly categoriesService;
    private readonly notificationsService;
    private readonly searchKeywordsService;
    constructor(postsRepository: Repository<Post>, categoriesService: CategoriesService, notificationsService: NotificationsService, searchKeywordsService: SearchKeywordsService);
    posts(postsArgs: PostsArgs, me?: User): Promise<OffsetPaginatedPost>;
    findById(id: string): Promise<Post>;
    categoryPosts(categoryPostsArgs: CategoryPostsArgs): Promise<OffsetPaginatedPost>;
    likePosts(likePostsArgs: LikePostsArgs, authId: string): Promise<OffsetPaginatedPost>;
    followingPosts(followingPostArgs: FollowingPostsArgs, authId: string): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Post>>;
    removedPosts(removedPostsArgs: RemovedPostsArgs, authId: string): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Post>>;
    create(createPostInput: CreatePostDto, user: User): Promise<Post>;
    update(updatePostInput: UpdatePostInput, post: Post): Promise<Post>;
    setPostCategories(post: Post, categories: string[]): Promise<Post>;
    delete(post: Post): Promise<Post>;
    restore(post: Post): Promise<Post>;
    like(post: Post, me: User): Promise<void>;
    unlike(post: Post, me: User): Promise<void>;
    isLiked(postId: string, authId: string): Promise<boolean>;
}
