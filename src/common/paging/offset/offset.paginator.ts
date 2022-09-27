import { IOffsetPaginatedType } from './offset.interface';
import { OffsetMetadata } from './offset.metadata';

export class OffsetPaginator<T> {
    constructor(private offset: number, private limit: number) {}

    getCurrentPage(): number {
        const { offset, limit } = this;

        let page = 1;
        if (offset > 0) {
            page = Math.ceil(offset / limit) + 1;
        }

        return page;
    }

    getLastPage(total: number): number {
        const { limit } = this;

        return Math.ceil(total / limit);
    }

    response(instances: T[], totalCount: number): IOffsetPaginatedType<T> {
        const { limit } = this;

        const pageInfo: OffsetMetadata = {
            currentPage: this.getCurrentPage(),
            lastPage: this.getLastPage(totalCount),
            pageSize: limit,
            nodeCount: instances.length,
            totalCount,
        };

        return {
            nodes: instances,
            pageInfo,
        };
    }
}
