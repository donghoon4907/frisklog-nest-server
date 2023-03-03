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
exports.Post = void 0;
const eager_import_0 = require("../users/user.entity");
const eager_import_1 = require("../categories/category.entity");
const eager_import_2 = require("../comments/comment.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const comment_entity_1 = require("../comments/comment.entity");
const category_entity_1 = require("../categories/category.entity");
const class_validator_1 = require("class-validator");
const post_interface_1 = require("./post.interface");
(0, graphql_1.registerEnumType)(post_interface_1.PostVisibility, { name: 'PostVisibility' });
let Post = class Post {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, content: { type: () => String }, visibility: { type: () => String }, link: { nullable: true, type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date }, deletedAt: { nullable: true, type: () => Date }, user: { type: () => require("../users/user.entity").User }, likers: { type: () => [require("../users/user.entity").User] }, isLiked: { nullable: true, type: () => Boolean }, likedCount: { nullable: true, type: () => Number }, categories: { type: () => [require("../categories/category.entity").Category] }, comments: { type: () => [require("../comments/comment.entity").Comment] }, commentCount: { nullable: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '내용',
        type: 'text',
    }),
    (0, graphql_1.Field)({ description: '내용' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '노출설정',
        type: 'enum',
        enum: post_interface_1.PostVisibility,
        default: post_interface_1.PostVisibility.PUBLIC,
    }),
    (0, graphql_1.Field)(() => String, { description: '노출설정' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(post_interface_1.PostVisibility),
    __metadata("design:type", String)
], Post.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '링크', nullable: true }),
    (0, graphql_1.Field)({ description: '링크', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], Post.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '작성자' }),
    __metadata("design:type", Promise)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.likes),
    (0, typeorm_1.JoinTable)({
        name: 'likes',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    }),
    (0, graphql_1.Field)(() => [user_entity_1.User], { description: '좋아요목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], Post.prototype, "likers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: '좋아요한 포스트여부' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Post.prototype, "isLiked", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '좋아요수', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Post.prototype, "likedCount", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, (category) => category.posts),
    (0, typeorm_1.JoinTable)({
        name: 'post_categories',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
    }),
    (0, graphql_1.Field)(() => [category_entity_1.Category], { description: '카테고리목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], Post.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => [comment_entity_1.Comment], { description: '댓글목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], Post.prototype, "comments", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '댓글수', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Post.prototype, "commentCount", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)('posts'),
    (0, graphql_1.ObjectType)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map