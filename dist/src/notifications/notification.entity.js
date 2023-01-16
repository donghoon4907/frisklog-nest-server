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
exports.Notification = void 0;
const eager_import_0 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Notification = class Notification {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, from: { type: () => require("../users/user.entity").User }, to: { type: () => require("../users/user.entity").User }, content: { type: () => String }, url: { type: () => String }, createdAt: { type: () => Date }, readedAt: { nullable: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sendNotifications),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '발신자' }),
    __metadata("design:type", Promise)
], Notification.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receiveNotifications),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '수신자' }),
    __metadata("design:type", Promise)
], Notification.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ description: '내용' }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ description: '링크' }),
    __metadata("design:type", String)
], Notification.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Notification.prototype, "readedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.HideField)(),
    __metadata("design:type", Date)
], Notification.prototype, "deletedAt", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)('notifications'),
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map