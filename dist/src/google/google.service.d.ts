import { HttpService } from '@nestjs/axios';
export declare class GoogleService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getProfile(accessToken: string): Promise<import("axios").AxiosResponse<any, any>>;
}
