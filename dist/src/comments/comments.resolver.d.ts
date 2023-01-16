import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsArgs } from './dto/comments.args';
import { OffsetPaginatedComment } from './dto/comments.response';
import { User } from '../users/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    comments(commentsArgs: CommentsArgs): Promise<OffsetPaginatedComment>;
    addComment(me: User, createCommentDto: CreateCommentDto): Promise<Comment>;
    updateComment(me: User, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    deleteComment(id: string): Promise<Comment>;
}
