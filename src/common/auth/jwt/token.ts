import jwt from 'jsonwebtoken';

import { User } from '../../../users/user.entity';

export const generateToken = (
    userEntity: User,
    expiresIn: string | null,
): string => {
    const { id, nickname, avatar, isMaster } = userEntity;

    const tokenConfig = {};

    if (expiresIn !== null) {
        tokenConfig['expiresIn'] = expiresIn;
    }

    return jwt.sign(
        { id, nickname, avatar, isMaster },
        process.env.JWT_SECRET,
        tokenConfig,
    );
};

export const getToken = (req: any): string | null => {
    const { authorization } = req.headers;

    let token = null;

    try {
        token = authorization.split(' ')[1];
    } catch (e) {}

    return token;
};

export const refreshToken = (userEntity: User): string | null => {
    return generateToken(userEntity, null);
};

export const decodeToken = (token: string): User | null => {
    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {}

    return decoded;
};
