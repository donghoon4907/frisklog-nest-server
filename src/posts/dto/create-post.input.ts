import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
    @Field()
    @MaxLength(5000)
    content: string;

    @Field(() => [String])
    categories: string[];
}
