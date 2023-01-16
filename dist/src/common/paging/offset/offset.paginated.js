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
exports.OffsetPaginated = void 0;
const graphql_1 = require("@nestjs/graphql");
const offset_metadata_1 = require("./offset.metadata");
function OffsetPaginated(classRef) {
    let PaginatedType = class PaginatedType {
    };
    __decorate([
        (0, graphql_1.Field)((type) => [classRef], { nullable: true }),
        __metadata("design:type", Array)
    ], PaginatedType.prototype, "nodes", void 0);
    __decorate([
        (0, graphql_1.Field)((type) => offset_metadata_1.OffsetMetadata),
        __metadata("design:type", offset_metadata_1.OffsetMetadata)
    ], PaginatedType.prototype, "pageInfo", void 0);
    PaginatedType = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], PaginatedType);
    return PaginatedType;
}
exports.OffsetPaginated = OffsetPaginated;
//# sourceMappingURL=offset.paginated.js.map