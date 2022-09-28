import { Field, ID, InputType, PickType } from '@nestjs/graphql';

import { CreateCommentDto } from './create-comment.dto';

@InputType()
export class UpdateCommentInput extends PickType(CreateCommentDto, [
    'content',
] as const) {}

@InputType()
export class UpdateCommentDto {
    @Field(() => String)
    id: string;

    @Field((type) => UpdateCommentInput)
    data: UpdateCommentInput;
}
