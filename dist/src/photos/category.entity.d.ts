import { Post } from '../posts/post.entity';
export declare class Category {
    id: string;
    content: string;
    posts: Promise<Post[]>;
    postCount?: number;
}
