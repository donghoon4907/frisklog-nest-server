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
exports.CommentsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const comment_entity_1 = require("./comment.entity");
const comments_service_1 = require("./comments.service");
const comments_args_1 = require("./dto/comments.args");
const comments_response_1 = require("./dto/comments.response");
const auth_guard_1 = require("../users/auth/auth.guard");
const auth_decorator_1 = require("../users/auth/auth.decorator");
const user_entity_1 = require("../users/user.entity");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    comments(commentsArgs) {
        return this.commentsService.comments(commentsArgs);
    }
    addComment(me, createCommentDto) {
        return this.commentsService.create(createCommentDto, me);
    }
    async updateComment(me, updateCommentDto) {
        const { id, data } = updateCommentDto;
        const comment = await this.commentsService.findOneById(id);
        if (comment === null) {
            throw new common_1.ForbiddenException('존재하지 않는 댓글입니다.');
        }
        comment.user = me;
        return this.commentsService.update(data, comment);
    }
    async deleteComment(id) {
        const comment = await this.commentsService.findOneById(id);
        if (comment === null) {
            throw new common_1.ForbiddenException('존재하지 않는 댓글입니다.');
        }
        return this.commentsService.delete(comment);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => comments_response_1.OffsetPaginatedComment),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_args_1.CommentsArgs]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "comments", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => comment_entity_1.Comment),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "addComment", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => comment_entity_1.Comment),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "updateComment", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => comment_entity_1.Comment),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "deleteComment", null);
CommentsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => comment_entity_1.Comment),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;
//# sourceMappingURL=comments.resolver.js.map