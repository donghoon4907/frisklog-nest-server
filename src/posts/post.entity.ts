import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
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

@Entity('posts')
@ObjectType()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({
        comment: '내용',
        type: 'text',
    })
    @Field()
    content: string;

    @Column({ comment: '링크', nullable: true })
    @Field()
    link?: string;

    @CreateDateColumn({ comment: '생성일' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    @Field()
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일' })
    deletedAt?: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
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

    @Field({ description: '좋아요수' })
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
    categories: Category[];

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Field({ description: '댓글수' })
    commentCount?: number;
}
