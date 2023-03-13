import { User } from '../users/user.entity';
import { PhotosService } from '../photos/photos.service';
import { UploadImageDto } from './dto/upload-image.dto';
export declare class UploadService {
    private readonly photosService;
    constructor(photosService: PhotosService);
    uploadImage(uploadImageDto: UploadImageDto, user: User): Promise<string>;
}
