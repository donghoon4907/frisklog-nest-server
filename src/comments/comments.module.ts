import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([User, Comment])],
    providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
