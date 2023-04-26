import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleService {
    constructor(private readonly httpService: HttpService) {}

    getProfile(accessToken: string) {
        const uri = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;

        const res = this.httpService.get(uri);

        return firstValueFrom(res);
    }
}
