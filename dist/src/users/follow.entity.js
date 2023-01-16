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
exports.Follow = void 0;
const eager_import_0 = require("./user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Follow = class Follow {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, acceptor: { type: () => require("./user.entity").User }, requester: { type: () => require("./user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Follow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.followers),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Promise)
], Follow.prototype, "acceptor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.followings),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Promise)
], Follow.prototype, "requester", void 0);
Follow = __decorate([
    (0, typeorm_1.Entity)('follow'),
    (0, graphql_1.ObjectType)()
], Follow);
exports.Follow = Follow;
//# sourceMappingURL=follow.entity.js.map