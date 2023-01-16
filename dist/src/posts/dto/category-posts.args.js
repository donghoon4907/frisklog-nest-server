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
exports.CategoryPostsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_args_1 = require("./posts.args");
let CategoryPostsArgs = class CategoryPostsArgs extends (0, graphql_1.PickType)(posts_args_1.PostsArgs, [
    'offset',
    'limit',
]) {
    static _GRAPHQL_METADATA_FACTORY() {
        return { category: { type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CategoryPostsArgs.prototype, "category", void 0);
CategoryPostsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CategoryPostsArgs);
exports.CategoryPostsArgs = CategoryPostsArgs;
//# sourceMappingURL=category-posts.args.js.map