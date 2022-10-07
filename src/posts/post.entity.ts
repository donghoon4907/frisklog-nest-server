import { Field, HideField, ObjectType } from '@nestjs/graphql';
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
    IsBoolean,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

@Entity('posts')
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        comment: '내용',
        type: 'text',
    })
    @Field({ description: '내용' })
    @IsString()
    content: string;

    @Column({ comment: '링크', nullable: true })
    @Field({ description: '링크', nullable: true })
    @IsOptional()
    @IsString()
    link?: string;

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User, { description: '작성자' })
    user: User;

    @Column({ name: 'userId' })
    @HideField()
    userId: string;

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
    @Field(() => [User], { description: '좋아요목록' })
    @IsArray()
    likers: Promise<User[]>;

    @Field(() => Boolean, { description: '좋아요한 포스트여부' })
    @IsOptional()
    @IsBoolean()
    isLiked?: boolean;

    @Field({ description: '좋아요수', nullable: true })
    @IsOptional()
    @IsNumber()
    likedCount?: number;

    @ManyToMany(() => Category, (category) => category.posts)
    @JoinTable({
        name: 'post_categories',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
    })
    @Field(() => [Category], { description: '카테고리목록' })
    @IsArray()
    categories: Promise<Category[]>;

    @OneToMany(() => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    @Field(() => [Comment], { description: '댓글목록' })
    @IsArray()
    comments: Promise<Comment[]>;

    @Field({ description: '댓글수', nullable: true })
    @IsOptional()
    @IsNumber()
    commentCount?: number;
}
