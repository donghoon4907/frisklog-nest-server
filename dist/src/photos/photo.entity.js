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
exports.Photo = void 0;
const eager_import_0 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const photo_interface_1 = require("./photo.interface");
const user_entity_1 = require("../users/user.entity");
let Photo = class Photo {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, src: { type: () => String }, type: { type: () => String }, user: { type: () => require("../users/user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '업로드주소' }),
    (0, graphql_1.Field)({ description: '업로드주소' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Photo.prototype, "src", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '사진타입',
        type: 'enum',
        enum: photo_interface_1.PhotoType,
    }),
    (0, graphql_1.Field)(() => String, { description: '사진타입' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(photo_interface_1.PhotoType),
    __metadata("design:type", String)
], Photo.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '사용자' }),
    __metadata("design:type", Promise)
], Photo.prototype, "user", void 0);
Photo = __decorate([
    (0, typeorm_1.Entity)('photos'),
    (0, graphql_1.ObjectType)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=photo.entity.js.map