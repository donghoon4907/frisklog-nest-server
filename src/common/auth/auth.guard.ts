import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';

import { User } from 'src/users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);

        const { req } = ctx.getContext();

        const { authorization } = req.headers;

        try {
            const token = authorization.split(' ')[1];

            const { id } = jwt.verify(token, process.env.JWT_SECRET) as User;

            const user = await User.findOne({
                where: { id },
                relations: {
                    followers: true,
                },
            });

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
