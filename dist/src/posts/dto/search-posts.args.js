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
exports.PostsArgs = void 0;
const eager_import_0 = require("../post.interface");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const offset_args_1 = require("../../common/paging/offset/offset.args");
const post_interface_1 = require("../post.interface");
let PostsArgs = class PostsArgs extends offset_args_1.OffsetPaginatedArgs {
    static _GRAPHQL_METADATA_FACTORY() {
        return { searchKeyword: { nullable: true, type: () => String }, userId: { nullable: true, type: () => String }, visibility: { nullable: true, type: () => require("../post.interface").PostVisibility }, ip: { nullable: true, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)({ description: '포스트 검색어', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PostsArgs.prototype, "searchKeyword", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '사용자 ID', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PostsArgs.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PostsArgs.prototype, "visibility", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PostsArgs.prototype, "ip", void 0);
PostsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], PostsArgs);
exports.PostsArgs = PostsArgs;
//# sourceMappingURL=search-posts.args.js.map