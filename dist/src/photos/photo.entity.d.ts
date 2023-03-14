import { User } from '../users/user.entity';
export declare class Photo {
    id: string;
    src: string;
    type: string;
    user: Promise<User>;
    createdAt: Date;
    deletedAt?: Date;
}
