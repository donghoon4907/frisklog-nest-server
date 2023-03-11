import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/user.entity';
export declare class PhotosService {
    private readonly photosRepository;
    constructor(photosRepository: Repository<Photo>);
    findById(id: string): Promise<Photo>;
    createPhoto(createPhotoInput: CreatePhotoDto, user: User): Promise<Photo>;
    deletePhoto(photo: Photo): Promise<Photo>;
}
