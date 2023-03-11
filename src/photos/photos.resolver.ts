import { Resolver } from '@nestjs/graphql';

import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';

@Resolver((of) => Photo)
export class PhotosResolver {
    constructor(private readonly photosService: PhotosService) {}
}
