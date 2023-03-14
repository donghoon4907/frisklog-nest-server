import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';
import { User } from 'src/users/user.entity';
import { PhotosArgs } from './dto/photos.args';
export declare class PhotosResolver {
    private readonly photosService;
    constructor(photosService: PhotosService);
    photos(me: User, photosArgs: PhotosArgs): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Photo>>;
    deletePhoto(id: string): Promise<Photo>;
}
