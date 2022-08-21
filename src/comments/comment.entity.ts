import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
    BaseEntity,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('comments')
@ObjectType()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({
        comment: '내용',
        type: 'text',
    })
    @Field()
    content: string;

    @CreateDateColumn({ comment: '생성일' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    @Field()
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일' })
    deletedAt?: Date;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;

    @Column({ name: 'postId' })
    postId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ name: 'userId' })
    userId: number;
}
