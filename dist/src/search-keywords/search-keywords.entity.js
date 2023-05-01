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
exports.SearchKeyword = void 0;
const eager_import_0 = require("../users/user.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const class_validator_1 = require("class-validator");
let SearchKeyword = class SearchKeyword {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, keyword: { type: () => String }, ip: { type: () => String }, createdAt: { type: () => Date }, user: { type: () => require("../users/user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SearchKeyword.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '검색 키워드',
    }),
    (0, graphql_1.Field)({ description: '검색 키워드' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchKeyword.prototype, "keyword", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '사용자 IP' }),
    (0, graphql_1.Field)({ description: '사용자 IP' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchKeyword.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], SearchKeyword.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, graphql_1.Field)(() => user_entity_1.User, { description: '검색 사용자' }),
    __metadata("design:type", Promise)
], SearchKeyword.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId', nullable: true }),
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], SearchKeyword.prototype, "userId", void 0);
SearchKeyword = __decorate([
    (0, typeorm_1.Entity)('searchKeywords'),
    (0, graphql_1.ObjectType)()
], SearchKeyword);
exports.SearchKeyword = SearchKeyword;
//# sourceMappingURL=search-keywords.entity.js.map