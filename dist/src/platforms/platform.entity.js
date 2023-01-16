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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
const eager_import_0 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Platform = class Platform extends typeorm_1.BaseEntity {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, platformName: { type: () => String }, logoUrl: { type: () => String }, domainUrl: { type: () => String }, users: { type: () => [require("../users/user.entity").User] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)((type) => graphql_1.ID),
    __metadata("design:type", Number)
], Platform.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)({ description: '플랫폼명' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Platform.prototype, "platformName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ description: '로고경로' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Platform.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ description: '도메인' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Platform.prototype, "domainUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.platform),
    (0, graphql_1.Field)(() => [user_entity_1.User], { description: '사용자목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Platform.prototype, "users", void 0);
Platform = __decorate([
    (0, typeorm_1.Entity)('platforms'),
    (0, graphql_1.ObjectType)()
], Platform);
exports.Platform = Platform;
//# sourceMappingURL=platform.entity.js.map