"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user.entity");
const context_1 = require("../../common/context");
let AuthGuard = class AuthGuard {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async canActivate(context) {
        let next = true;
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const token = (0, context_1.getBearerToken)(ctx.getContext());
        if (token) {
            const { id } = (0, context_1.decodeToken)(token);
            if (id) {
                const user = await this.usersRepository.findOneBy({ id });
                if (user === null) {
                    next = false;
                }
                else {
                    ctx.getContext().user = user;
                }
            }
            else {
                next = false;
            }
        }
        else {
            next = false;
        }
        if (!next) {
            throw new common_1.UnauthorizedException('세션이 만료되었습니다. 다시 로그인 해주세요.');
        }
        return next;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map