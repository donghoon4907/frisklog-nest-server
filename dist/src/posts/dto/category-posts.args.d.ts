import { PostsArgs } from './posts.args';
declare const CategoryPostsArgs_base: import("@nestjs/common").Type<Pick<PostsArgs, "offset" | "limit">>;
export declare class CategoryPostsArgs extends CategoryPostsArgs_base {
    category: string;
}
export {};
