import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
export declare class PhotosService {
    private readonly photosRepository;
    constructor(photosRepository: Repository<Photo>);
}
