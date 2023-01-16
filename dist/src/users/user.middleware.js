"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMeMiddleware = exports.isFollowingMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isFollowingMiddleware = async ({ context, source }, next) => {
    const user = await next();
    const { req } = context;
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const { id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return id === user.id;
    }
    catch (_a) {
        return false;
    }
};
exports.isFollowingMiddleware = isFollowingMiddleware;
const isMeMiddleware = async ({ context }, next) => {
    const user = await next();
    const { req } = context;
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const { id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return id === user.id;
    }
    catch (_a) {
        return false;
    }
};
exports.isMeMiddleware = isMeMiddleware;
//# sourceMappingURL=user.middleware.js.map