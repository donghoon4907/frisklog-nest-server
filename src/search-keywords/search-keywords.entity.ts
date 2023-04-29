import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { IsDateString, IsOptional, IsString } from 'class-validator';

@Entity('searchKeywords')
@ObjectType()
export class SearchKeyword {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({
        comment: '검색 키워드',
    })
    @Field({ description: '검색 키워드' })
    @IsString()
    keyword: string;

    @Column({ comment: 'ip' })
    @Field({ description: 'ip' })
    @IsOptional()
    @IsString()
    ip: string;

    @CreateDateColumn()
    @Field()
    @IsDateString()
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    @Field(() => User, { description: '검색 사용자' })
    userId: Promise<User>;
}
