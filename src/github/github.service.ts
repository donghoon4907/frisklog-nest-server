import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
    constructor(private readonly httpService: HttpService) {}

    getAccessToken(code: string) {
        const uri = 'https://github.com/login/oauth/access_token';

        const params = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            code,
        };

        const res = this.httpService.post(uri, params);

        return firstValueFrom(res);
    }

    getProfile(accessToken: string) {
        const uri = 'https://api.github.com/user';

        const params = {
            headers: {
                authorization: `token ${accessToken}`,
            },
        };

        const res = this.httpService.get(uri, params);

        return firstValueFrom(res);
    }
}
