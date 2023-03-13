import { IsEnum, IsString } from 'class-validator';

import { PhotoType } from '../../photos/photo.interface';

export class UploadImageDto {
    @IsString()
    src: string;

    @IsString()
    @IsEnum(PhotoType)
    type: string;
}
