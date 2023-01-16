import { HttpService } from '@nestjs/axios';
export declare class GithubService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getAccessToken(code: string): Promise<import("axios").AxiosResponse<any, any>>;
    getProfile(accessToken: string): Promise<import("axios").AxiosResponse<any, any>>;
}
