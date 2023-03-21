import * as fs from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';
import { PhotosArgs } from './dto/photos.args';
import { OffsetPaginator } from '../common/paging/offset/offset.paginator';

@Injectable()
export class PhotosService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Photo)
        private readonly photosRepository: Repository<Photo>,
    ) {}

    async photos(photosArgs: PhotosArgs, authId: string) {
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

        const paginator = new OffsetPaginator<Photo>(offset, limit);

        return paginator.response(photos, total);
    }

    findById(id: string) {
        return this.photosRepository.findOne({
            where: { id },
        });
    }

    async createPhoto(createPhotoInput: CreatePhotoDto, user: User) {
        const { src, type } = createPhotoInput;

        const photo = new Photo();

        photo.src = src;

        photo.type = type;

        photo.user = Promise.resolve(user);

        await this.photosRepository.save(photo);

        return photo;
    }

    async deletePhoto(photo: Photo) {
        await this.photosRepository.softRemove(photo);

        const fileNameStartIndex = photo.src.lastIndexOf('/');

        const fileName = photo.src.substring(fileNameStartIndex);

        const uri = `${process.cwd()}/public/upload${fileName}`;

        try {
            fs.readFileSync(uri);
        } catch {
            this.logger.warn(
                `PhotosService->deletePhoto: ${fileName} 파일이 존재하지 않습니다.`,
            );
        }

        try {
            fs.unlinkSync(`${process.cwd()}/public/upload${fileName}`);
        } catch {
            this.logger.warn(
                `PhotosService->deletePhoto: ${fileName} 파일 삭제 중 오류가 발생했습니다.`,
            );
        }

        return photo;
    }
}
