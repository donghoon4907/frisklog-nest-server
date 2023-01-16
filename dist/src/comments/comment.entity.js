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
exports.Comment = void 0;
const eager_import_0 = require("../posts/post.entity");
const eager_import_1 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../users/user.entity");
const post_entity_1 = require("../posts/post.entity");
let Comment = class Comment {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, content: { type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date }, post: { type: () => require("../posts/post.entity").Post }, user: { type: () => require("../users/user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '내용',
        type: 'text',
    }),
    (0, graphql_1.Field)({ description: '내용' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.HideField)(),
    __metadata("design:type", Date)
], Comment.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post),
    (0, typeorm_1.JoinColumn)({ name: 'postId' }),
    (0, graphql_1.Field)(() => post_entity_1.Post, { description: '게시물' }),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postId' }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '작성자' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)('comments'),
    (0, graphql_1.ObjectType)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map