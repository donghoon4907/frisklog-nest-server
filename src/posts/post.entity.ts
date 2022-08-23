import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { Category } from '../categories/category.entity';
import {
    IsArray,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

@Entity('posts')
@ObjectType()
export class Post {
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

    @Column({ comment: '링크', nullable: true })
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    link?: string;

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User)
    user: User;

    @Column({ name: 'userId' })
    userId: number;

    @ManyToMany(() => User, (user) => user.likes)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    likers: User[];

    @Field({ description: '좋아요수', nullable: true })
    @IsOptional()
    @IsNumber()
    likeCount?: number;

    @ManyToMany(() => Category, (category) => category.posts)
    @JoinTable({
        name: 'post_categories',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    @Field(() => [Category], { description: '포스트의 카테고리' })
    @IsArray()
    categories: Category[];

    @OneToMany(() => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    comments: Comment[];

    @Field({ description: '댓글수', nullable: true })
    @IsOptional()
    @IsNumber()
    commentCount?: number;
}
