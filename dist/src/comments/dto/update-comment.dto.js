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
exports.UpdateCommentDto = exports.UpdateCommentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_comment_dto_1 = require("./create-comment.dto");
let UpdateCommentInput = class UpdateCommentInput extends (0, graphql_1.PickType)(create_comment_dto_1.CreateCommentDto, [
    'content',
]) {
};
UpdateCommentInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCommentInput);
exports.UpdateCommentInput = UpdateCommentInput;
let UpdateCommentDto = class UpdateCommentDto {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateCommentDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UpdateCommentInput),
    __metadata("design:type", UpdateCommentInput)
], UpdateCommentDto.prototype, "data", void 0);
UpdateCommentDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateCommentDto);
exports.UpdateCommentDto = UpdateCommentDto;
//# sourceMappingURL=update-comment.dto.js.map