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
exports.Category = void 0;
const eager_import_0 = require("../posts/post.entity");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../posts/post.entity");
let Category = class Category {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, content: { type: () => String }, posts: { type: () => [require("../posts/post.entity").Post] }, postCount: { nullable: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '카테고리명',
        type: 'text',
    }),
    (0, graphql_1.Field)({ description: '카테고리명' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_entity_1.Post, (post) => post.categories),
    (0, graphql_1.Field)(() => [post_entity_1.Post], { description: '게시물목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], Category.prototype, "posts", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '게시물수' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Category.prototype, "postCount", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)('categories'),
    (0, graphql_1.ObjectType)()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map