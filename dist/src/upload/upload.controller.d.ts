/// <reference types="multer" />
import { UploadService } from './upload.service';
import { User } from '../users/user.entity';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(me: User, file: Express.Multer.File, type: string): Promise<string>;
}
