import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NaverService {
    constructor(private readonly httpService: HttpService) {}

    getAccessToken(code: string) {
        const uri =
            'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code';

        const params = {
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            code,
        };

        const res = this.httpService.get(uri, { params });

        return firstValueFrom(res);
    }

    getProfile(accessToken: string) {
        const uri = 'https://openapi.naver.com/v1/nid/me';

        const params = {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        };

        const res = this.httpService.get(uri, params);

        return firstValueFrom(res);
    }
}
