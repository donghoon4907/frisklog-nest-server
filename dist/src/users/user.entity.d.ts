import { Platform } from '../platforms/platform.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Follow } from './follow.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Notification } from '../notifications/notification.entity';
import { Photo } from 'src/photos/photo.entity';
export declare class User {
    id: string;
    githubId?: number;
    naverId?: string;
    email?: string;
    nickname: string;
    avatar: string;
    isMaster: boolean;
    captcha?: string;
    status: string;
    isKeep?: boolean;
    token?: string;
    statusText: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    platform: Promise<Platform>;
    platformId: number;
    posts: Promise<Post[]>;
    postCount?: number;
    comments: Promise<Comment[]>;
    likes: Promise<Post[]>;
    followers: Promise<Follow[]>;
    followerCount?: number;
    followings: Promise<Follow[]>;
    followingCount?: number;
    isFollowing?: boolean;
    isMe?: boolean;
    attendances: Promise<Attendance[]>;
    lastAccessAt?: Date;
    receiveNotifications: Promise<Notification[]>;
    sendNotifications: Promise<Notification[]>;
    receivePostNotification: boolean;
    receiveLikeNotification: boolean;
    photos: Promise<Photo[]>;
    updateAvatar(): void;
    generateToken(): string;
}
