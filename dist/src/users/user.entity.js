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
exports.User = void 0;
const eager_import_0 = require("../platforms/platform.entity");
const eager_import_1 = require("../posts/post.entity");
const eager_import_2 = require("../comments/comment.entity");
const eager_import_3 = require("./follow.entity");
const eager_import_4 = require("../attendance/attendance.entity");
const eager_import_5 = require("../notifications/notification.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const platform_entity_1 = require("../platforms/platform.entity");
const post_entity_1 = require("../posts/post.entity");
const comment_entity_1 = require("../comments/comment.entity");
const user_interface_1 = require("./user.interface");
const follow_entity_1 = require("./follow.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const notification_entity_1 = require("../notifications/notification.entity");
(0, graphql_1.registerEnumType)(user_interface_1.UserStatus, { name: 'UserStatus' });
let User = class User {
    updateAvatar() {
        let avatar = this.avatar;
        if (!avatar) {
            this.avatar = `${process.env.BACKEND_HOST}/static/default-avatar.png`;
        }
    }
    generateToken() {
        const { id, isKeep } = this;
        let expiresIn = '365d';
        if (!isKeep) {
            expiresIn = '3h';
        }
        return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, { expiresIn });
    }
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, nickname: { type: () => String }, avatar: { type: () => String }, isMaster: { type: () => Boolean }, status: { type: () => String }, isKeep: { nullable: true, type: () => Boolean }, token: { nullable: true, type: () => String }, statusText: { type: () => String }, link: { type: () => String }, createdAt: { type: () => Date }, updatedAt: { type: () => Date }, platform: { type: () => require("../platforms/platform.entity").Platform }, posts: { type: () => [require("../posts/post.entity").Post] }, postCount: { nullable: true, type: () => Number }, comments: { type: () => [require("../comments/comment.entity").Comment] }, likes: { type: () => [require("../posts/post.entity").Post] }, followers: { type: () => [require("./follow.entity").Follow] }, followerCount: { nullable: true, type: () => Number }, followings: { type: () => [require("./follow.entity").Follow] }, followingCount: { nullable: true, type: () => Number }, isFollowing: { nullable: true, type: () => Boolean }, isMe: { nullable: true, type: () => Boolean }, attendances: { type: () => [require("../attendance/attendance.entity").Attendance] }, lastAccessAt: { nullable: true, type: () => Date }, receiveNotifications: { type: () => [require("../notifications/notification.entity").Notification] }, sendNotifications: { type: () => [require("../notifications/notification.entity").Notification] }, receivePostNotification: { type: () => Boolean } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'github_id', nullable: true, unique: true }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", Number)
], User.prototype, "githubId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '이메일', nullable: true, unique: true }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '별명' }),
    (0, graphql_1.Field)({ description: '별명' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '프로필사진' }),
    (0, graphql_1.Field)({ description: '프로필사진' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '관리자여부', default: false }),
    (0, graphql_1.Field)({ description: '관리자여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "isMaster", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '보안문자', nullable: true }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "captcha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '상태코드',
        type: 'enum',
        enum: user_interface_1.UserStatus,
        default: user_interface_1.UserStatus.OFFLINE,
    }),
    (0, graphql_1.Field)(() => String, { description: '상태코드' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(user_interface_1.UserStatus),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '로그인유지여부', nullable: true }),
    (0, graphql_1.Field)({ description: '로그인유지여부', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "isKeep", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '로그인토큰', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '상태설명' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "statusText", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '링크' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.HideField)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => platform_entity_1.Platform),
    (0, typeorm_1.JoinColumn)({ name: 'platformId' }),
    (0, graphql_1.Field)(() => platform_entity_1.Platform, { description: '플랫폼' }),
    __metadata("design:type", Promise)
], User.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'platformId' }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", Number)
], User.prototype, "platformId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.user, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => [post_entity_1.Post], { description: '작성한포스트목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "posts", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '작성한포스트수', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], User.prototype, "postCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '작성한댓글목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_entity_1.Post, (user) => user.likers),
    (0, graphql_1.Field)(() => [post_entity_1.Post], { description: '좋아요한포스트목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.acceptor),
    (0, graphql_1.Field)(() => [follow_entity_1.Follow], { description: '팔로워 목록' }),
    __metadata("design:type", Promise)
], User.prototype, "followers", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '팔로워수' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], User.prototype, "followerCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.requester),
    (0, graphql_1.Field)(() => [follow_entity_1.Follow], { description: '팔로워 목록' }),
    __metadata("design:type", Promise)
], User.prototype, "followings", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '팔로잉수' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], User.prototype, "followingCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: '팔로잉여부' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "isFollowing", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: '자신여부' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "isMe", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.user, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => [attendance_entity_1.Attendance], { description: '작성한포스트목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '최근 접속일', nullable: true }),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], User.prototype, "lastAccessAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (noti) => noti.to, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => [notification_entity_1.Notification], { description: '받은 알림 목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "receiveNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (noti) => noti.from, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => [notification_entity_1.Notification], { description: '보낸 알림 목록' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Promise)
], User.prototype, "sendNotifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)({ description: '팔로워포스팅알림여부' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "receivePostNotification", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateAvatar", null);
User = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map