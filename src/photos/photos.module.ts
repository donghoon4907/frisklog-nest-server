import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Photo } from './photo.entity';
import { PhotosService } from './photos.service';
import { PhotosResolver } from './photos.resolver';
import { User } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Photo])],
    providers: [PhotosService, PhotosResolver],
    exports: [PhotosService],
})
export class PhotosModule {}
