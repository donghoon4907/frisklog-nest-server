import {
    EntitySubscriberInterface,
    EventSubscriber,
    DataSource,
} from 'typeorm';

import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    afterLoad(user: User) {
        user.link = `${process.env.FRONTEND_HOST}/user/${user.id}`;

        const { status } = user;

        let statusText = null;
        if (status === 'online') {
            statusText = '온라인';
        } else if (status === 'offline') {
            statusText = '오프라인';
        } else if (status === 'away') {
            statusText = '자리비움';
        } else if (status === 'busy') {
            statusText = '바쁨';
        }

        user.statusText = statusText;
    }
}
