import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
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
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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
    @Field({ description: '내용' })
    @IsString()
    content: string;

    @CreateDateColumn()
    @Field()
    @IsDateString()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    @IsDateString()
    updatedAt: Date;

    @DeleteDateColumn()
    @HideField()
    deletedAt?: Date;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    @Field(() => Post, { description: '게시물' })
    post: Post;

    @Column({ name: 'postId' })
    @HideField()
    postId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User, { description: '작성자' })
    user: User;

    @Column({ name: 'userId' })
    @HideField()
    userId: number;
}
