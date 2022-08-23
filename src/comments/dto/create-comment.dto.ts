import { InputType, PickType } from '@nestjs/graphql';
import { Comment } from '../comment.entity';

@InputType()
export class CreateCommentDto extends PickType(
    Comment,
    ['content', 'postId'],
    InputType,
) {}
