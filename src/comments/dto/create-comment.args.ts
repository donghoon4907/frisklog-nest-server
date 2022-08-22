import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentArgs {
    @Field()
    content: string;

    @Field(() => ID)
    postId: number;
}
