import { User } from '../users/user.entity';
export declare class SearchKeyword {
    id: string;
    keyword: string;
    ip: string;
    createdAt: Date;
    userId: Promise<User>;
}
