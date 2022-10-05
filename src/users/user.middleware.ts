import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { JwtPayload, verify } from 'jsonwebtoken';

// 현재 사용하지 않습니다.
export const isFollowingMiddleware: FieldMiddleware = async (
    { context, source }: MiddlewareContext,
    next: NextFn,
) => {
    const user = await next();

    const { req } = context;

    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1] as string;

        const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;

        return id === user.id;
    } catch {
        return false;
    }
};
// 현재 사용하지 않습니다.
export const isMeMiddleware: FieldMiddleware = async (
    { context }: MiddlewareContext,
    next: NextFn,
) => {
    const user = await next();

    const { req } = context;

    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1] as string;

        const { id } = verify(token, process.env.JWT_SECRET) as JwtPayload;

        return id === user.id;
    } catch {
        return false;
    }
};
