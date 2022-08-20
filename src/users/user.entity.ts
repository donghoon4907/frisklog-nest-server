import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
    DeleteDateColumn,
    BeforeUpdate,
    BeforeInsert,
    RelationId,
    BaseEntity,
    OneToMany,
    RelationCount,
} from 'typeorm';
import jwt from 'jsonwebtoken';

import { Platform } from '../platforms/platform.entity';
import { UserStatus } from './user.interface';

@Entity('Users')
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ comment: '이메일', nullable: true, unique: true })
    email: string;

    @Column({ comment: '별명' })
    @Field()
    nickname: string;

    @Column({ comment: '프로필사진' })
    @Field()
    avatar: string;

    @Column({ comment: '관리자여부', default: false })
    @Field()
    isMaster: boolean;

    @Column({ comment: '보안문자', nullable: true })
    captcha?: string;

    @Column({
        comment: '상태코드',
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.OFFLINE,
    })
    @Field()
    status: string;

    @Column({ comment: '로그인유지여부', nullable: true })
    @Field({ nullable: true })
    isKeep?: boolean;

    @Field({ description: '로그인토큰', nullable: true })
    token?: string;

    @Field({ description: '상태설명' })
    statusText: string;

    @Field({ description: '링크' })
    link: string;

    @CreateDateColumn({ comment: '생성일' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    @Field()
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제일' })
    deletedAt?: Date;

    @ManyToOne(() => Platform)
    @JoinColumn({ name: 'platformId' })
    platform: Platform;

    // @RelationId((user: User) => user.platform)
    @Column({ name: 'platformId' })
    platformId: number;

    @ManyToMany(() => User, (user) => user.followings)
    @JoinTable({
        name: 'Follows',
        joinColumn: {
            name: 'FollowingId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'FollowerId',
            referencedColumnName: 'id',
        },
    })
    followers: User[];

    @Field()
    followerCount?: number;

    @ManyToMany(() => User, (user) => user.followers)
    followings: User[];

    @Field()
    followingCount?: number;

    @BeforeInsert()
    @BeforeUpdate()
    updateAvatar() {
        let avatar = this.avatar;

        if (avatar === null) {
            avatar = '/avatar.png';
        }

        const hasDomain = avatar.includes('http');

        if (!hasDomain) {
            this.avatar = process.env.BACKEND_ROOT + avatar;
        }
    }

    generateToken() {
        const { id, nickname, avatar, isKeep } = this;

        const tokenConfig = {};

        if (!isKeep) {
            tokenConfig['expiresIn'] = '3h';
        }

        return jwt.sign(
            { id, nickname, avatar },
            process.env.JWT_SECRET,
            tokenConfig,
        );
    }

    refreshToken() {
        return this.generateToken();
    }
}
