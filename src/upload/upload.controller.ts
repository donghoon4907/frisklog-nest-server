import {
    Controller,
    Post,
    UploadedFile,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ErrorFilter } from '../common/filters/error.filter';

@Controller('upload')
@UseFilters(new ErrorFilter())
export class UploadController {
    @Post('image')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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
        @UploadedFile()
        file: Express.Multer.File,
    ) {
        return file.filename;
    }
}
