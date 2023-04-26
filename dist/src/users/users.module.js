"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const user_subscriber_1 = require("./user.subscriber");
const date_scalar_1 = require("../common/scalars/date.scalar");
const follow_entity_1 = require("./follow.entity");
const attendance_module_1 = require("../attendance/attendance.module");
const github_module_1 = require("../github/github.module");
const naver_module_1 = require("../naver/naver.module");
const google_module_1 = require("../google/google.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, follow_entity_1.Follow]),
            (0, common_1.forwardRef)(() => attendance_module_1.AttendanceModule),
            (0, common_1.forwardRef)(() => github_module_1.GithubModule),
            (0, common_1.forwardRef)(() => naver_module_1.NaverModule),
            (0, common_1.forwardRef)(() => google_module_1.GoogleModule),
        ],
        providers: [users_service_1.UsersService, users_resolver_1.UsersResolver, user_subscriber_1.UserSubscriber, date_scalar_1.DateScalar],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map