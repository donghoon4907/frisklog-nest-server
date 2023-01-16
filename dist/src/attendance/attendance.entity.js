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
exports.Attendance = void 0;
const eager_import_0 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Attendance = class Attendance {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, user: { type: () => require("../users/user.entity").User }, createdAt: { type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Attendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '사용자' }),
    __metadata("design:type", Promise)
], Attendance.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], Attendance.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Attendance.prototype, "createdAt", void 0);
Attendance = __decorate([
    (0, typeorm_1.Entity)('attendance'),
    (0, graphql_1.ObjectType)()
], Attendance);
exports.Attendance = Attendance;
//# sourceMappingURL=attendance.entity.js.map