"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPaginator = void 0;
class OffsetPaginator {
    constructor(offset, limit) {
        this.offset = offset;
        this.limit = limit;
    }
    getCurrentPage() {
        const { offset, limit } = this;
        let page = 1;
        if (offset > 0) {
            page = Math.ceil(offset / limit) + 1;
        }
        return page;
    }
    getLastPage(total) {
        const { limit } = this;
        return Math.ceil(total / limit);
    }
    response(instances, totalCount) {
        const { limit } = this;
        const pageInfo = {
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
exports.OffsetPaginator = OffsetPaginator;
//# sourceMappingURL=offset.paginator.js.map