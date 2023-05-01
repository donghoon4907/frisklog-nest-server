"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const post_entity_1 = require("./post.entity");
const posts_service_1 = require("./posts.service");
const posts_resolver_1 = require("./posts.resolver");
const categories_module_1 = require("../categories/categories.module");
const notifications_module_1 = require("../notifications/notifications.module");
const search_keywords_module_1 = require("../search-keywords/search-keywords.module");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, post_entity_1.Post]),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            (0, common_1.forwardRef)(() => search_keywords_module_1.SearchKeywordsModule),
        ],
        providers: [
            posts_service_1.PostsService,
            posts_resolver_1.PostsResolver,
        ],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map