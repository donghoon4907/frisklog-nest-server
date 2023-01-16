"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.getBearerToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const getBearerToken = (ctx) => {
    const { req } = ctx;
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        return token;
    }
    catch (_a) {
        return null;
    }
};
exports.getBearerToken = getBearerToken;
const decodeToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (_a) {
        return {};
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=index.js.map