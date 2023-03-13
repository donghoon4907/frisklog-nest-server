import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PhotosModule } from '../photos/photos.module';
import { User } from '../users/user.entity';

@Module({
    imports: [
        MulterModule.register({
            dest: './public/upload',
        }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => PhotosModule),
    ],
    providers: [UploadService],
    controllers: [UploadController],
})
export class UploadModule {}
