import { Field, HideField, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @Column({ comment: '사용자 IP' })
    @Field({ description: '사용자 IP' })
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
    user: Promise<User>;

    @Column({ name: 'userId', nullable: true })
    @HideField()
    userId?: string;

    @Field({ description: '검색 횟수', nullable: true })
    @IsOptional()
    @IsNumber()
    searchCount?: number;
}
