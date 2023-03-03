import { Field, InputType, ID, PickType } from '@nestjs/graphql';

import { CreatePostDto } from './create-post.dto';

@InputType()
export class UpdatePostInput extends PickType(CreatePostDto, [
    'content',
    'categories',
    'visibility',
] as const) {}

@InputType()
export class UpdatePostDto {
    @Field()
    id: string;

    @Field((type) => UpdatePostInput)
    data: UpdatePostInput;
}
