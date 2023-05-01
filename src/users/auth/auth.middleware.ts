import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { decodeToken, getBearerToken } from '../../common/context';

@Injectable()
export class AuthMiddleware implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const token = getBearerToken(ctx.getContext());

        if (token) {
            const { id } = decodeToken(token);

            if (id) {
                const user = await this.usersRepository.findOneBy({ id });

                if (user !== null) {
                    ctx.getContext().user = user;
                }
            }
        }

        return true;
    }
}
