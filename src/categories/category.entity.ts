import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany,
} from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({
        comment: '카테고리명',
        type: 'text',
    })
    @Field()
    content: string;

    @ManyToMany(() => Post, (post) => post.categories)
    posts: Post[];
}
