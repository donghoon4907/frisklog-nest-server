import { JwtPayload } from 'jsonwebtoken';
export declare const getBearerToken: (ctx: any) => any;
export declare const decodeToken: (token: string) => JwtPayload;
