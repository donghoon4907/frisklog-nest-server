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
exports.CommentsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const offset_args_1 = require("../../common/paging/offset/offset.args");
let CommentsArgs = class CommentsArgs extends offset_args_1.OffsetPaginatedArgs {
    static _GRAPHQL_METADATA_FACTORY() {
        return { postId: { type: () => String }, order: { nullable: true, type: () => [[String]] } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CommentsArgs.prototype, "postId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[String]]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CommentsArgs.prototype, "order", void 0);
CommentsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], CommentsArgs);
exports.CommentsArgs = CommentsArgs;
//# sourceMappingURL=comments.args.js.map