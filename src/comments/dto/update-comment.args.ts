import { Field, ID, InputType, PickType } from '@nestjs/graphql';

import { CreateCommentArgs } from './create-comment.args';

@InputType()
export class UpdateCommentArgs extends PickType(CreateCommentArgs, [
    'content',
]) {
    @Field(() => ID)
    id: number;
}
