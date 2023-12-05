import {
    Controller,
    Post,
    Query,
    UploadedFile,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ErrorFilter } from '../common/filters/error.filter';
import { UploadService } from './upload.service';
import { AuthGuard } from '../users/auth/auth.guard';
import { AuthUser } from '../users/auth/auth.decorator';
import { User } from '../users/user.entity';

@Controller('upload')
@UseFilters(new ErrorFilter())
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('image')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|png|gif)$/i)) {
                    return callback(
                        new Error('허용되지 않은 확장자입니다.'),
                        false,
                    );
                }

                callback(null, true);
            },
        }),
    )
    uploadImage(
        @AuthUser() me: User,
        @UploadedFile()
        file: Express.Multer.File,
        @Query('type') type: string,
    ) {
        return this.uploadService.uploadImage(
            {
                src: `${process.env.BACKEND_HOST}/upload/${file.filename}`,
                type,
            },
            me,
        );
    }
}
