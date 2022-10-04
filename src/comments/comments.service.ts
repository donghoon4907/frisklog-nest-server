import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Comment } from './comment.entity';
import { CommentsArgs } from './dto/comments.args';
import { OffsetPaginatedComment } from './dto/comments.response';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentInput } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
    ) {}

    async comments(
        commentsArgs: CommentsArgs,
    ): Promise<OffsetPaginatedComment> {
        const { offset, limit, postId } = commentsArgs;

        const [comments, total] = await this.commentsRepository.findAndCount({
            where: {
                post: {
                    id: postId,
                },
            },
            relations: {
                user: true,
                post: true,
            },
            skip: offset,
            take: limit,
            order: {
                id: 'DESC',
            },
        });

        const paginator = new OffsetPaginator<Comment>(offset, limit);

        return paginator.response(comments, total);
    }

    async findOneById(id: string) {
        return this.commentsRepository.findOneBy({ id });
    }

    async create(createCommentDto: CreateCommentDto, user: User) {
        const { content, postId } = createCommentDto;

        const comment = new Comment();

        comment.content = content;

        comment.postId = postId;

        comment.user = user;

        return this.commentsRepository.save(comment);
    }

    async update(updateCommentInput: UpdateCommentInput, comment: Comment) {
        const { content } = updateCommentInput;

        comment.content = content;

        return this.commentsRepository.save(comment);
    }

    async delete(comment: Comment): Promise<Comment> {
        return this.commentsRepository.softRemove(comment);
    }
}
