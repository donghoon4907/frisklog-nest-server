import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';
import { CommentsArgs } from './dto/comments.args';
import { OffsetPaginatedComment } from './dto/comments.response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentInput } from './dto/update-comment.dto';
export declare class CommentsService {
    private readonly commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    comments(commentsArgs: CommentsArgs): Promise<OffsetPaginatedComment>;
    findOneById(id: string): Promise<Comment>;
    create(createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    update(updateCommentInput: UpdateCommentInput, comment: Comment): Promise<Comment>;
    delete(comment: Comment): Promise<Comment>;
}
