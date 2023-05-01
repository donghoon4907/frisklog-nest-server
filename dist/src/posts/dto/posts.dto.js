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
exports.PostsDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const post_entity_1 = require("../post.entity");
let PostsDto = class PostsDto extends (0, graphql_1.PartialType)((0, graphql_1.PickType)(post_entity_1.Post, ['visibility'], graphql_1.InputType)) {
};
__decorate([
    (0, graphql_1.Field)({ description: '포스트 검색어', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostsDto.prototype, "searchKeyword", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '사용자 ID', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostsDto.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)({ description: '사용자 IP', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostsDto.prototype, "ip", void 0);
PostsDto = __decorate([
    (0, graphql_1.InputType)()
], PostsDto);
exports.PostsDto = PostsDto;
//# sourceMappingURL=posts.dto.js.map