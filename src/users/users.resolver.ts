import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { OffsetPaginatedUser } from './dto/users.response';

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query((returns) => OffsetPaginatedUser)
    users(@Args() usersArgs: UsersArgs): Promise<OffsetPaginatedUser> {
        return this.usersService.findAll(usersArgs);
    }

    @Query((returns) => User)
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.usersService.findOneById(id);

        if (user === null) {
            throw new NotFoundException(id);
        }

        return user;
    }
}
