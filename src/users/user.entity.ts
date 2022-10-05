import {
    Field,
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
import { sign } from 'jsonwebtoken';

import { Platform } from '../platforms/platform.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { UserStatus } from './user.interface';
import { Follow } from './follow.entity';

registerEnumType(UserStatus, { name: 'UserStatus' });

@Entity('users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ comment: 'github_id', nullable: true, unique: true })
    @HideField()
    githubId?: number;

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
    @Field(() => String, { description: '상태코드' })
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

    // lazy relation 활성화: Promise 타입으로 정의
    // 이후 DB조회 시 조인하지 않아도 쿼리리턴값에 정의하는 것만으로 로드 가능
    @ManyToOne(() => Platform)
    @JoinColumn({ name: 'platformId' })
    @Field(() => Platform, { description: '플랫폼' })
    platform: Promise<Platform>;

    // @RelationId((user: User) => user.platform)
    @Column({ name: 'platformId' })
    @HideField()
    platformId: number;

    @OneToMany(() => Post, (post) => post.user, {
        onDelete: 'CASCADE',
    })
    @Field(() => [Post], { description: '작성한포스트목록' })
    @IsArray()
    posts: Promise<Post[]>;

    @Field(() => Int, { description: '작성한포스트수', nullable: true })
    @IsOptional()
    @IsNumber()
    postCount?: number;

    @OneToMany(() => Comment, (comment) => comment.user, {
        onDelete: 'CASCADE',
    })
    @Field(() => Int, { description: '작성한댓글목록' })
    @IsArray()
    comments: Promise<Comment[]>;

    @ManyToMany(() => Post, (user) => user.likers)
    @Field(() => [Post], { description: '좋아요한포스트목록' })
    @IsArray()
    likes: Promise<Post[]>;

    // 2022-10-05 Self relation의 경우 Duplicate entry 오류가 발생하여 커스텀 엔티티로 대체
    // @ManyToMany(() => User, (user) => user.followings)
    // @JoinTable({
    //     name: 'follow',
    //     joinColumn: {
    //         name: 'followerId',
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'followingId',
    //         referencedColumnName: 'id',
    //     },
    // })
    // @Field(() => [User], { description: '팔로워목록' })
    // @IsArray()
    // followers: Promise<User[]>;
    // @ManyToMany(() => User, (user) => user.followers)
    // @Field(() => [User], { description: '팔로잉목록' })
    // @IsArray()
    // followings: Promise<User[]>;

    @OneToMany(() => Follow, (follow) => follow.acceptor)
    @Field(() => [Follow], { description: '팔로워 목록' })
    followers: Promise<Follow[]>;

    @Field(() => Int, { description: '팔로워수' })
    @IsOptional()
    @IsNumber()
    followerCount?: number;

    @OneToMany(() => Follow, (follow) => follow.requester)
    @Field(() => [Follow], { description: '팔로워 목록' })
    followings: Promise<Follow[]>;

    @Field(() => Int, { description: '팔로잉수' })
    @IsOptional()
    @IsNumber()
    followingCount?: number;

    // @Field(() => [User])
    // @IsOptional()
    // @IsArray()
    // searchedFollowings?: User[];

    // @Field(() => Boolean, { description: '팔로잉여부' })
    // @IsOptional()
    // @IsBoolean()
    // isFollowing?: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    updateAvatar() {
        let avatar = this.avatar;

        if (!avatar) {
            avatar = 'default-avatar.png';
        }

        const hasDomain = avatar.includes('http');

        if (!hasDomain) {
            this.avatar = `${process.env.BACKEND_ROOT}/${avatar}`;
        }
    }

    generateToken() {
        const { id, isKeep } = this;

        let expiresIn = '365d';
        if (!isKeep) {
            expiresIn = '3h';
        }

        return sign({ id }, process.env.JWT_SECRET, { expiresIn });
    }
}
