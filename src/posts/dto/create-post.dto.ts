import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { Post } from '../post.entity';

@InputType()
export class CreatePostDto extends PickType(
    Post,
    ['content', 'visibility'],
    InputType,
) {
    @Field(() => [String])
    @IsArray()
    categories: string[];
}
