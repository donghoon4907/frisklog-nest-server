"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePostsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_args_1 = require("./posts.args");
let LikePostsArgs = class LikePostsArgs extends (0, graphql_1.PickType)(posts_args_1.PostsArgs, [
    'offset',
    'limit',
]) {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
LikePostsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], LikePostsArgs);
exports.LikePostsArgs = LikePostsArgs;
//# sourceMappingURL=like-posts.args.js.map