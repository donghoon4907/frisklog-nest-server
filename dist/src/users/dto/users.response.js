"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorPaginatedUser = exports.OffsetPaginatedUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const offset_paginated_1 = require("../../common/paging/offset/offset.paginated");
const cursor_paginated_1 = require("../../common/paging/cursor/cursor.paginated");
const user_entity_1 = require("../user.entity");
let OffsetPaginatedUser = class OffsetPaginatedUser extends (0, offset_paginated_1.OffsetPaginated)(user_entity_1.User) {
};
OffsetPaginatedUser = __decorate([
    (0, graphql_1.ObjectType)()
], OffsetPaginatedUser);
exports.OffsetPaginatedUser = OffsetPaginatedUser;
let CursorPaginatedUser = class CursorPaginatedUser extends (0, cursor_paginated_1.CursorPaginated)(user_entity_1.User) {
};
CursorPaginatedUser = __decorate([
    (0, graphql_1.ObjectType)()
], CursorPaginatedUser);
exports.CursorPaginatedUser = CursorPaginatedUser;
//# sourceMappingURL=users.response.js.map