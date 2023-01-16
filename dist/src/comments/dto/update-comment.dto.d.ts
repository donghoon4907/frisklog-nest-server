import { CreateCommentDto } from './create-comment.dto';
declare const UpdateCommentInput_base: import("@nestjs/common").Type<Pick<CreateCommentDto, "content">>;
export declare class UpdateCommentInput extends UpdateCommentInput_base {
}
export declare class UpdateCommentDto {
    id: string;
    data: UpdateCommentInput;
}
export {};
