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
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("../users/user.entity");
const posts_service_1 = require("./posts.service");
const posts_response_1 = require("./dto/posts.response");
const posts_args_1 = require("./dto/posts.args");
const category_posts_args_1 = require("./dto/category-posts.args");
const like_posts_args_1 = require("./dto/like-posts.args");
const following_posts_args_1 = require("./dto/following-posts.args");
const auth_guard_1 = require("../users/auth/auth.guard");
const auth_decorator_1 = require("../users/auth/auth.decorator");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const context_1 = require("../common/context");
const removed_posts_args_1 = require("./dto/removed-posts.args");
const req_decorator_1 = require("../common/decorators/req.decorator");
const auth_middleware_1 = require("../users/auth/auth.middleware");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    posts(ip, me, postsArgs) {
        return this.postsService.posts(Object.assign(Object.assign({}, postsArgs), { ip }), me);
    }
    categoryPosts(categoryPostsArgs) {
        return this.postsService.categoryPosts(categoryPostsArgs);
    }
    likePosts(me, likePostsArgs) {
        return this.postsService.likePosts(likePostsArgs, me.id);
    }
    followingPosts(me, followingPostArgs) {
        return this.postsService.followingPosts(followingPostArgs, me.id);
    }
    removedPosts(me, removedPostsArgs) {
        return this.postsService.removedPosts(removedPostsArgs, me.id);
    }
    addPost(me, createPostDto) {
        return this.postsService.create(createPostDto, me);
    }
    async updatePost(updatePostDto) {
        const { id, data } = updatePostDto;
        const post = await this.postsService.findById(id);
        if (post === null) {
            throw new common_1.ForbiddenException('존재하지 않는 포스트입니다.');
        }
        return this.postsService.update(data, post);
    }
    async deletePost(id) {
        const post = await this.postsService.findById(id);
        if (post === null) {
            throw new common_1.ForbiddenException('존재하지 않는 포스트입니다.');
        }
        return this.postsService.delete(post);
    }
    async restorePost(id) {
        const post = await this.postsService.findById(id);
        if (post === null) {
            throw new common_1.ForbiddenException('존재하지 않는 포스트입니다.');
        }
        return this.postsService.restore(post);
    }
    async like(me, id) {
        const post = await this.postsService.findById(id);
        if (post === null) {
            throw new common_1.ForbiddenException('존재하지 않는 포스트입니다.');
        }
        await this.postsService.like(post, me);
        return true;
    }
    async unlike(me, id) {
        const post = await this.postsService.findById(id);
        if (post === null) {
            throw new common_1.ForbiddenException('존재하지 않는 포스트입니다.');
        }
        await this.postsService.unlike(post, me);
        return true;
    }
    async isLiked(post, ctx) {
        const token = (0, context_1.getBearerToken)(ctx);
        if (token) {
            const { id } = (0, context_1.decodeToken)(token);
            if (id) {
                return this.postsService.isLiked(post.id, id);
            }
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => posts_response_1.OffsetPaginatedPost),
    (0, common_1.UseGuards)(auth_middleware_1.AuthMiddleware),
    __param(0, (0, req_decorator_1.GetIp)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __param(2, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        posts_args_1.PostsArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "posts", null);
__decorate([
    (0, graphql_1.Query)((returns) => posts_response_1.OffsetPaginatedPost),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_posts_args_1.CategoryPostsArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "categoryPosts", null);
__decorate([
    (0, graphql_1.Query)((returns) => posts_response_1.OffsetPaginatedPost),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, like_posts_args_1.LikePostsArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "likePosts", null);
__decorate([
    (0, graphql_1.Query)((returns) => posts_response_1.OffsetPaginatedPost),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        following_posts_args_1.FollowingPostsArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "followingPosts", null);
__decorate([
    (0, graphql_1.Query)((returns) => posts_response_1.OffsetPaginatedPost),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        removed_posts_args_1.RemovedPostsArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "removedPosts", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => post_entity_1.Post),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "addPost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => post_entity_1.Post),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "updatePost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => post_entity_1.Post),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletePost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => post_entity_1.Post),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "restorePost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "like", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "unlike", null);
__decorate([
    (0, graphql_1.ResolveField)((returns) => Boolean),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "isLiked", null);
PostsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => post_entity_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map