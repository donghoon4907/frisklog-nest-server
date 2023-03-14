import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';
import { AuthGuard } from '../users/auth/auth.guard';
import { OffsetPaginatedPhoto } from './dto/photos.response';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { User } from 'src/users/user.entity';
import { PhotosArgs } from './dto/photos.args';

@Resolver((of) => Photo)
export class PhotosResolver {
    constructor(private readonly photosService: PhotosService) {}

    @Query((returns) => OffsetPaginatedPhoto)
    @UseGuards(AuthGuard)
    async photos(@AuthUser() me: User, @Args() photosArgs: PhotosArgs) {
        return this.photosService.photos(photosArgs, me.id);
    }

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
