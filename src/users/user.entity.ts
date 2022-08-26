import {
    Field,
    ID,
    ObjectType,
    Int,
    registerEnumType,
    HideField,
} from '@nestjs/graphql';
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
    OneToMany,
} from 'typeorm';
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
    IsDateString,
    IsArray,
} from 'class-validator';
import jwt from 'jsonwebtoken';

import { Platform } from '../platforms/platform.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { UserStatus } from './user.interface';

registerEnumType(UserStatus, { name: 'UserStatus' });

@Entity('users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    @IsNumber()
    id: number;

    @Column({ comment: '이메일', nullable: true, unique: true })
    @HideField()
    email?: string;

    @Column({ comment: '별명' })
    @Field({ description: '별명' })
    @IsString()
    nickname: string;

    @Column({ comment: '프로필사진' })
    @Field({ description: '프로필사진' })
    @IsString()
    avatar: string;

    @Column({ comment: '관리자여부', default: false })
    @Field({ description: '관리자여부' })
    @IsBoolean()
    isMaster: boolean;

    @Column({ comment: '보안문자', nullable: true })
    @HideField()
    captcha?: string;

    @Column({
        comment: '상태코드',
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.OFFLINE,
    })
    @Field(() => UserStatus, { description: '상태코드' })
    @IsString()
    @IsEnum(UserStatus)
    status: string;

    @Column({ comment: '로그인유지여부', nullable: true })
    @Field({ description: '로그인유지여부', nullable: true })
    @IsOptional()
    @IsBoolean()
    isKeep?: boolean;

    @Field({ description: '로그인토큰', nullable: true })
    @IsOptional()
    @IsString()
    token?: string;

    @Field({ description: '상태설명' })
    @IsString()
    statusText: string;

    @Field({ description: '링크' })
    @IsString()
    link: string;

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

    @ManyToOne(() => Platform)
    @JoinColumn({ name: 'platformId' })
    @Field(() => Platform, { description: '플랫폼' })
    platform: Platform;

    // @RelationId((user: User) => user.platform)
    @Column({ name: 'platformId' })
    @HideField()
    platformId: number;

    @OneToMany(() => Post, (post) => post.user, {
        onDelete: 'CASCADE',
    })
    @Field(() => [Post], { description: '작성한포스트목록' })
    @IsArray()
    posts: Post[];

    @Field(() => Int, { description: '작성한포스트수', nullable: true })
    @IsOptional()
    @IsNumber()
    postCount?: number;

    @OneToMany(() => Comment, (comment) => comment.user, {
        onDelete: 'CASCADE',
    })
    @Field(() => Int, { description: '작성한댓글목록' })
    @IsArray()
    comments: Comment[];

    @ManyToMany(() => Post, (user) => user.likers)
    @Field(() => [Post], { description: '좋아요한포스트목록' })
    @IsArray()
    likes: Post[];

    @ManyToMany(() => User, (user) => user.followings)
    @JoinTable({
        name: 'follows',
        joinColumn: {
            name: 'followingId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'followerId',
            referencedColumnName: 'id',
        },
    })
    @Field(() => [User], { description: '팔로워목록' })
    @IsArray()
    followers: User[];

    @Field(() => Int, { description: '팔로워수' })
    @IsOptional()
    @IsNumber()
    followerCount?: number;

    @ManyToMany(() => User, (user) => user.followers)
    @Field(() => [User], { description: '팔로잉목록' })
    @IsArray()
    followings: User[];

    @Field(() => Int, { description: '팔로잉수' })
    @IsOptional()
    @IsNumber()
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
