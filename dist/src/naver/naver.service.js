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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let NaverService = class NaverService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAccessToken(code) {
        const url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code';
        const params = {
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            code,
        };
        const res = this.httpService.get(url, { params });
        return (0, rxjs_1.firstValueFrom)(res);
    }
    getProfile(accessToken) {
        const url = 'https://openapi.naver.com/v1/nid/me';
        const params = {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        };
        const res = this.httpService.get(url, params);
        return (0, rxjs_1.firstValueFrom)(res);
    }
};
NaverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], NaverService);
exports.NaverService = NaverService;
//# sourceMappingURL=naver.service.js.map