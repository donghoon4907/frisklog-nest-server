import { PostsArgs } from './posts.args';
declare const FollowingPostsArgs_base: import("@nestjs/common").Type<Pick<PostsArgs, "offset" | "limit" | "userId">>;
export declare class FollowingPostsArgs extends FollowingPostsArgs_base {
}
export {};
