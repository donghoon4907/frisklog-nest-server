import { IPaginatedType, OffsetPageInfo } from './paginated';

interface IOffsetPaginateArgs {
    offset: number;
    limit: number;
}

export class OffsetPaginate<T> {
    constructor(private readonly offsetPaginateArgs: IOffsetPaginateArgs) {}

    getCurrentPage(): number {
        const { offset, limit } = this.offsetPaginateArgs;

        let page = 1;
        if (offset > 0) {
            page = Math.ceil(offset / limit);
        }

        return page;
    }

    getLastPage(total: number): number {
        const { limit } = this.offsetPaginateArgs;

        return Math.ceil(total / limit);
    }

    response(instances: T[], totalCount: number): IPaginatedType<T> {
        const { limit } = this.offsetPaginateArgs;

        const pageInfo: OffsetPageInfo = {
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
