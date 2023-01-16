"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPaginatedPost = void 0;
const graphql_1 = require("@nestjs/graphql");
const offset_paginated_1 = require("../../common/paging/offset/offset.paginated");
const post_entity_1 = require("../post.entity");
let OffsetPaginatedPost = class OffsetPaginatedPost extends (0, offset_paginated_1.OffsetPaginated)(post_entity_1.Post) {
};
OffsetPaginatedPost = __decorate([
    (0, graphql_1.ObjectType)()
], OffsetPaginatedPost);
exports.OffsetPaginatedPost = OffsetPaginatedPost;
//# sourceMappingURL=posts.response.js.map