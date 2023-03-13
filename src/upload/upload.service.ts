import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { User } from '../users/user.entity';
import { PhotosService } from '../photos/photos.service';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class UploadService {
    constructor(
        @Inject(forwardRef(() => PhotosService))
        private readonly photosService: PhotosService,
    ) {}

    async uploadImage(uploadImageDto: UploadImageDto, user: User) {
        await this.photosService.createPhoto(uploadImageDto, user);

        return uploadImageDto.src;
    }
}
