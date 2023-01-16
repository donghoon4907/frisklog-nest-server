import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { Category } from '../categories/category.entity';
export declare class Post {
    id: string;
    content: string;
    link?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    user: Promise<User>;
    likers: Promise<User[]>;
    isLiked?: boolean;
    likedCount?: number;
    categories: Promise<Category[]>;
    comments: Promise<Comment[]>;
    commentCount?: number;
}
