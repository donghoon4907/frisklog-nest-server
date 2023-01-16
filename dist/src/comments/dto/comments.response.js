"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPaginatedComment = void 0;
const graphql_1 = require("@nestjs/graphql");
const offset_paginated_1 = require("../../common/paging/offset/offset.paginated");
const comment_entity_1 = require("../comment.entity");
let OffsetPaginatedComment = class OffsetPaginatedComment extends (0, offset_paginated_1.OffsetPaginated)(comment_entity_1.Comment) {
};
OffsetPaginatedComment = __decorate([
    (0, graphql_1.ObjectType)()
], OffsetPaginatedComment);
exports.OffsetPaginatedComment = OffsetPaginatedComment;
//# sourceMappingURL=comments.response.js.map