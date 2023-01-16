import { User } from './user.entity';
export declare class Follow {
    id: string;
    acceptor: Promise<User>;
    requester: Promise<User>;
}
