import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Photo } from './photo.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo)
        private readonly photosRepository: Repository<Photo>,
    ) {}
}
