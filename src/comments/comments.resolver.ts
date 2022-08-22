import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsArgs } from './dto/comments.args';
import { OffsetPaginatedComment } from './dto/comments.response';
import { AuthGuard } from '../users/auth/auth.guard';
import { AuthUser } from '../users/auth/auth.decorator';
import { User } from '../users/user.entity';
import { CreateCommentArgs } from './dto/create-comment.args';
import { UpdateCommentArgs } from './dto/update-comment.args';

@Resolver((of) => Comment)
export class CommentsResolver {
    constructor(private readonly commentsService: CommentsService) {}

    @Query((returns) => OffsetPaginatedComment)
    comments(@Args() commentsArgs: CommentsArgs) {
        return this.commentsService.comments(commentsArgs);
    }

    @Mutation((returns) => Comment)
    @UseGuards(AuthGuard)
    addComment(
        @AuthUser() me: User,
        @Args('createCommentArgs') createCommentArgs: CreateCommentArgs,
    ) {
        return this.commentsService.create(createCommentArgs, me);
    }

    @Mutation((returns) => Comment)
    @UseGuards(AuthGuard)
    async updateComment(
        @Args('updateCommentArgs') updateCommentArgs: UpdateCommentArgs,
    ) {
        const { id } = updateCommentArgs;

        const comment = await this.commentsService.findOneById(id);

        if (comment === null) {
            throw new ForbiddenException('존재하지 않는 댓글입니다.');
        }

        return this.commentsService.update(updateCommentArgs, comment);
    }

    @Mutation((returns) => Comment)
    @UseGuards(AuthGuard)
    async deleteComment(@Args('id') id: number) {
        const comment = await this.commentsService.findOneById(id);

        if (comment === null) {
            throw new ForbiddenException('존재하지 않는 댓글입니다.');
        }

        return this.commentsService.delete(comment);
    }
}
