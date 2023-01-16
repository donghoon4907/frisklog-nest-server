import { User } from '../users/user.entity';
export declare class Notification {
    id: string;
    from: Promise<User>;
    to: Promise<User>;
    content: string;
    url: string;
    createdAt: Date;
    readedAt?: Date;
    deletedAt?: Date;
}
