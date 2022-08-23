import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity('categories')
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    @IsNumber()
    id: number;

    @Column({
        comment: '카테고리명',
        type: 'text',
    })
    @Field()
    @IsString()
    content: string;

    @ManyToMany(() => Post, (post) => post.categories)
    posts: Post[];
}
