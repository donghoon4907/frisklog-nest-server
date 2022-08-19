import { IOffsetPaginatedType } from './offset.interface';
import { OffsetMetadata } from './offset.metadata';

interface IOptions {
    offset: number;
    limit: number;
}

export class OffsetPaginator<T> {
    protected offset: number;
    protected limit: number;

    constructor(options: IOptions) {
        const { offset, limit } = options;

        this.offset = offset;

        this.limit = limit;
    }

    getCurrentPage(): number {
        const { offset, limit } = this;

        let page = 1;
        if (offset > 0) {
            page = Math.ceil(offset / limit);
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
