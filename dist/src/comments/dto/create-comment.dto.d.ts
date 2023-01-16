import { Comment } from '../comment.entity';
declare const CreateCommentDto_base: import("@nestjs/common").Type<Pick<Comment, "content">>;
export declare class CreateCommentDto extends CreateCommentDto_base {
    postId: string;
}
export {};
