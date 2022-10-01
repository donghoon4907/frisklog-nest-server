import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload, verify } from 'jsonwebtoken';

import { User } from '../user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const { req } = ctx.getContext();

        const { authorization } = req.headers;

        try {
            const token = authorization.split(' ')[1] as string;

            const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;

            const user = await this.usersRepository.findOneBy({ id });

            if (user === null) {
                throw new Error();
            }

            ctx.getContext().user = user;
        } catch {
            throw new UnauthorizedException(
                '세션이 만료되었습니다. 다시 로그인 해주세요.',
            );
        }

        return true;
    }
}
