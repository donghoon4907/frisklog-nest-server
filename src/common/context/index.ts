import { JwtPayload, verify } from 'jsonwebtoken';

export const getBearerToken = (ctx: any) => {
    const { req } = ctx;

    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];

        return token;
    } catch {
        return null;
    }
};

export const decodeToken = (token: string) => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;

        return decoded;
    } catch {
        return {};
    }
};
