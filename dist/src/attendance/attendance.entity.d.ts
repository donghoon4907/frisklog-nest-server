import { User } from '../users/user.entity';
export declare class Attendance {
    id: string;
    user: Promise<User>;
    userId: string;
    createdAt: Date;
}
