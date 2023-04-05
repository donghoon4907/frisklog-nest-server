"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const error_filter_1 = require("../common/filters/error.filter");
const upload_service_1 = require("./upload.service");
const auth_guard_1 = require("../users/auth/auth.guard");
const auth_decorator_1 = require("../users/auth/auth.decorator");
const user_entity_1 = require("../users/user.entity");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadImage(me, file, type) {
        return this.uploadService.uploadImage({
            src: `${process.env.BACKEND_HOST}/upload/${file.filename}`,
            type,
        }, me);
    }
};
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|JPG|png|PNG|gif|GIF)$/)) {
                return callback(new Error('허용되지 않은 확장자입니다.'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object, String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadImage", null);
UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    (0, common_1.UseFilters)(new error_filter_1.ErrorFilter()),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map