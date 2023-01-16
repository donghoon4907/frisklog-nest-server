import { Post } from '../post.entity';
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<Post, "content">>;
export declare class CreatePostDto extends CreatePostDto_base {
    categories: string[];
}
export {};
