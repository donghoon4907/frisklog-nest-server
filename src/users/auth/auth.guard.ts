import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { decodeToken, getBearerToken } from 'src/common/context';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let next = true;

        const ctx = GqlExecutionContext.create(context);

        const token = getBearerToken(ctx.getContext());

        if (token) {
            const { id } = decodeToken(token);

            if (id) {
                const user = await this.usersRepository.findOneBy({ id });

                if (user === null) {
                    next = false;
                } else {
                    ctx.getContext().user = user;
                }
            } else {
                next = false;
            }
        } else {
            next = false;
        }

        if (!next) {
            throw new UnauthorizedException(
                '세션이 만료되었습니다. 다시 로그인 해주세요.',
            );
        }

        return next;
    }
}
