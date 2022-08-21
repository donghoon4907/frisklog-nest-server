import { Field, InputType, ID, PickType } from '@nestjs/graphql';

import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends PickType(CreatePostInput, [
    'content',
    'categories',
] as const) {
    @Field(() => ID)
    id: number;
}
