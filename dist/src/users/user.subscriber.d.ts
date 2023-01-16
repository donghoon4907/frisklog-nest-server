import { EntitySubscriberInterface, DataSource } from 'typeorm';
import { User } from './user.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource);
    listenTo(): typeof User;
    afterLoad(user: User): void;
}
