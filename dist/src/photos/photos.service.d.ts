import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';
import { PhotosArgs } from './dto/photos.args';
export declare class PhotosService {
    private readonly logger;
    private readonly photosRepository;
    constructor(logger: Logger, photosRepository: Repository<Photo>);
    photos(photosArgs: PhotosArgs, authId: string): Promise<import("../common/paging/offset/offset.interface").IOffsetPaginatedType<Photo>>;
    findById(id: string): Promise<Photo>;
    createPhoto(createPhotoInput: CreatePhotoDto, user: User): Promise<Photo>;
    deletePhoto(photo: Photo): Promise<Photo>;
}
