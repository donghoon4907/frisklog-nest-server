import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
export declare class Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    post: Post;
    postId: string;
    user: User;
    userId: string;
}
