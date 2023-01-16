import { IOffsetPaginatedType } from './offset.interface';
export declare class OffsetPaginator<T> {
    private offset;
    private limit;
    constructor(offset: number, limit: number);
    getCurrentPage(): number;
    getLastPage(total: number): number;
    response(instances: T[], totalCount: number): IOffsetPaginatedType<T>;
}
