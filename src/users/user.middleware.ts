import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { JwtPayload, verify } from 'jsonwebtoken';

export const isFollowingMiddleware: FieldMiddleware = async (
    { context }: MiddlewareContext,
    next: NextFn,
) => {
    const user = await next();

    const { req } = context;

    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1] as string;

        const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch {
        return false;
    }
};
