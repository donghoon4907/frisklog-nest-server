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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const photo_entity_1 = require("./photo.entity");
const photos_service_1 = require("./photos.service");
const auth_guard_1 = require("../users/auth/auth.guard");
let PhotosResolver = class PhotosResolver {
    constructor(photosService) {
        this.photosService = photosService;
    }
    async deletePhoto(id) {
        const photo = await this.photosService.findById(id);
        if (photo === null) {
            throw new common_1.ForbiddenException('존재하지 않는 사진입니다.');
        }
        return this.photosService.deletePhoto(photo);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => photo_entity_1.Photo),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotosResolver.prototype, "deletePhoto", null);
PhotosResolver = __decorate([
    (0, graphql_1.Resolver)((of) => photo_entity_1.Photo),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosResolver);
exports.PhotosResolver = PhotosResolver;
//# sourceMappingURL=photos.resolver.js.map