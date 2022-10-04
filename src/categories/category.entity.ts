import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity('categories')
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        comment: '카테고리명',
        type: 'text',
    })
    @Field({ description: '카테고리명' })
    @IsString()
    content: string;

    @ManyToMany(() => Post, (post) => post.categories)
    @Field(() => [Post], { description: '게시물목록' })
    @IsArray()
    posts: Post[];

    @Field(() => Int, { description: '게시물수' })
    @IsOptional()
    @IsNumber()
    postCount?: number;
}
