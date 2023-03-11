import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';
import { AuthGuard } from '../users/auth/auth.guard';

@Resolver((of) => Photo)
export class PhotosResolver {
    constructor(private readonly photosService: PhotosService) {}

    @Mutation((returns) => Photo)
    @UseGuards(AuthGuard)
    async deletePhoto(@Args('id') id: string) {
        const photo = await this.photosService.findById(id);

        if (photo === null) {
            throw new ForbiddenException('존재하지 않는 사진입니다.');
        }

        return this.photosService.deletePhoto(photo);
    }
}
