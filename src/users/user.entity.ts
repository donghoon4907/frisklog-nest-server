import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';

import { Platform } from '../platforms/platform.entity';

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away',
    BUSY = 'busy',
}

@Entity('Users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: number;

    @Column({ nullable: true, unique: true })
    @Field({ description: '이메일', nullable: true })
    email: string;

    @Column({ length: 50 })
    @Field({ description: '별명' })
    nickname: string;

    @Column({ nullable: true })
    @Field({ description: '프로필사진', nullable: true })
    avatar?: string;

    @Column({ default: false })
    @Field({ description: '관리자여부' })
    isMaster: boolean;

    @Column({ nullable: true })
    @Field({ description: '보안문자', nullable: true })
    token?: string;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.OFFLINE })
    @Field({ description: '상태코드' })
    status: string;

    @Field({ description: '상태설명' })
    statusText: string;

    @Field({ description: '링크' })
    link: string;

    @CreateDateColumn()
    @Field({ description: '생성일' })
    createdAt: Date;

    @UpdateDateColumn()
    @Field({ description: '수정일' })
    updatedAt: Date;

    @ManyToOne(() => Platform, (platform) => platform.users)
    platform: Platform;
}
