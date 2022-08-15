import { Injectable } from '@nestjs/common';

import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    async findAll(usersArgs: UsersArgs): Promise<OffsetPaginatedUser> {
        return null;
    }

    async findOneById(id: string): Promise<User> {
        return null;
    }
}
