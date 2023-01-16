import { CreatePostDto } from './create-post.dto';
declare const UpdatePostInput_base: import("@nestjs/common").Type<Pick<CreatePostDto, "content" | "categories">>;
export declare class UpdatePostInput extends UpdatePostInput_base {
}
export declare class UpdatePostDto {
    id: string;
    data: UpdatePostInput;
}
export {};
