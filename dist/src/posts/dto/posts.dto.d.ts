import { Post } from '../post.entity';
declare const PostsDto_base: import("@nestjs/common").Type<Partial<Pick<Post, "visibility">>>;
export declare class PostsDto extends PostsDto_base {
    searchKeyword?: string;
    userId?: string;
    ip?: string;
}
export {};
