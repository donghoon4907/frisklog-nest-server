import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';
import { PhotosArgs } from './dto/photos.args';
import { OffsetPaginator } from 'src/common/paging/offset/offset.paginator';

@Injectable()
export class PhotosService {
    constructor(
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

        try {
            fs.unlinkSync(`${process.cwd()}/public/upload${fileName}`);
        } catch {
            console.log('삭제를 요청한 파일을 찾을 수 없습니다.');
        }

        return photo;
    }
}
