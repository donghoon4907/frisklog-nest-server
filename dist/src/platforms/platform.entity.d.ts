import { BaseEntity } from 'typeorm';
import { User } from '../users/user.entity';
export declare class Platform extends BaseEntity {
    id: number;
    platformName: string;
    logoUrl: string;
    domainUrl: string;
    users: User[];
}
