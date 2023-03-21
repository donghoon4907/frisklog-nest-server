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
exports.PhotosService = void 0;
const fs = require("fs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const photo_entity_1 = require("./photo.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
let PhotosService = class PhotosService {
    constructor(logger, photosRepository) {
        this.logger = logger;
        this.photosRepository = photosRepository;
    }
    async photos(photosArgs, authId) {
        const { offset, limit, type } = photosArgs;
        const qb = this.photosRepository
            .createQueryBuilder('photo')
            .innerJoinAndSelect('photo.user', 'user')
            .where('user.id = :authId', { authId })
            .orderBy('photo.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        if (type) {
            qb.andWhere('photo.type = :type', {
                type,
            });
        }
        const [photos, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(photos, total);
    }
    findById(id) {
        return this.photosRepository.findOne({
            where: { id },
        });
    }
    async createPhoto(createPhotoInput, user) {
        const { src, type } = createPhotoInput;
        const photo = new photo_entity_1.Photo();
        photo.src = src;
        photo.type = type;
        photo.user = Promise.resolve(user);
        await this.photosRepository.save(photo);
        return photo;
    }
    async deletePhoto(photo) {
        await this.photosRepository.softRemove(photo);
        const fileNameStartIndex = photo.src.lastIndexOf('/');
        const fileName = photo.src.substring(fileNameStartIndex);
        const uri = `${process.cwd()}/public/upload${fileName}`;
        try {
            fs.readFileSync(uri);
        }
        catch (_a) {
            this.logger.warn(`PhotosService->deletePhoto: ${fileName} 파일이 존재하지 않습니다.`);
        }
        try {
            fs.unlinkSync(`${process.cwd()}/public/upload${fileName}`);
        }
        catch (_b) {
            this.logger.warn(`PhotosService->deletePhoto: ${fileName} 파일 삭제 중 오류가 발생했습니다.`);
        }
        return photo;
    }
};
PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __param(1, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [winston_1.Logger,
        typeorm_2.Repository])
], PhotosService);
exports.PhotosService = PhotosService;
//# sourceMappingURL=photos.service.js.map