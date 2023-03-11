import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo)
        private readonly photosRepository: Repository<Photo>,
    ) {}

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

    deletePhoto(photo: Photo) {
        return this.photosRepository.softRemove(photo);
    }
}
