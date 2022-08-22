import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CommentsArgs } from './dto/comments.args';
import { OffsetPaginatedComment } from './dto/comments.response';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';
import { CreateCommentArgs } from './dto/create-comment.args';
import { User } from '../users/user.entity';
import { UpdateCommentArgs } from './dto/update-comment.args';

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

    async findOneById(id: number) {
        return this.commentsRepository.findOneBy({ id });
    }

    async create(createCommentArgs: CreateCommentArgs, me: User) {
        const { content, postId } = createCommentArgs;

        const comment = new Comment();

        comment.content = content;

        comment.postId = postId;

        comment.userId = me.id;

        return this.commentsRepository.save(comment);
    }

    async update(updateCommentArgs: UpdateCommentArgs, comment: Comment) {
        const { content } = updateCommentArgs;

        comment.content = content;

        return comment.save();
    }

    async delete(comment: Comment): Promise<Comment> {
        return comment.softRemove();
    }
}
