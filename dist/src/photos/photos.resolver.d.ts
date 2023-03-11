import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';
export declare class PhotosResolver {
    private readonly photosService;
    constructor(photosService: PhotosService);
    deletePhoto(id: string): Promise<Photo>;
}
