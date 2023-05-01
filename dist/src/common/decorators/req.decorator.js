"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIp = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GetIp = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.ip;
});
//# sourceMappingURL=req.decorator.js.map