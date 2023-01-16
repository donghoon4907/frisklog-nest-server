"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.AuthUser = (0, common_1.createParamDecorator)((data, ctx) => graphql_1.GqlExecutionContext.create(ctx).getContext().user);
//# sourceMappingURL=auth.decorator.js.map