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
} from 'typeorm';
import { IsDateString, IsNumber, IsString } from 'class-validator';

import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('comments')
@ObjectType()
export class Comment {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    @IsNumber()
    id: number;

    @Column({
        comment: '내용',
        type: 'text',
    })
    @Field()
    @IsString()
    content: string;

    @CreateDateColumn({ comment: '생성일' })
    @Field()
    @IsDateString()
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    @Field()
    @IsDateString()
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일' })
    deletedAt?: Date;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;

    @Column({ name: 'postId' })
    @Field(() => ID)
    @IsNumber()
    postId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ name: 'userId' })
    userId: number;
}
