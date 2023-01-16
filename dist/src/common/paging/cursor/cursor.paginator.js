"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorPaginator = void 0;
const typeorm_1 = require("typeorm");
class CursorPaginator {
    constructor(qb, options) {
        this.qb = qb;
        this._encoding = 'base64';
        this._delimiter = '|';
        const { first, last, after, before, order = {} } = options;
        this.first = first;
        this.last = last;
        this.after = after;
        this.before = before;
        this.order = this.normalizeOrder(order);
        this.applyOrder(order);
        this.pageSize = (first !== null && first !== void 0 ? first : last);
        if (last) {
            this.order = this.reverseOrder(this.order);
        }
        if (after) {
            this.applyCursor(after);
        }
        if (before) {
            this.applyCursor(before, true);
        }
    }
    async paginate() {
        const { qb, pageSize } = this;
        return qb.limit(pageSize + 1).getRawAndEntities();
    }
    async response(result) {
        const { pageSize } = this;
        const { hasNext, hasPrevious } = this.getHasNextAndPrevious(result);
        const edges = this.getEdges(result);
        const totalCount = await this.getTotalCount();
        const pageInfo = {
            pageSize,
            totalCount,
            hasNextPage: hasNext,
            hasPreviousPage: hasPrevious,
            startCursor: this.getStartCursor(edges),
            endCursor: this.getEndCursor(edges),
        };
        return {
            edges,
            pageInfo,
        };
    }
    async getTotalCount() {
        return this.qb.getCount();
    }
    getEdges(result) {
        const { pageSize } = this;
        const { entities, raw } = result;
        const resEntities = entities.slice(0, pageSize);
        return resEntities.map((entity, index) => {
            const row = raw[index];
            return {
                node: entity,
                cursor: this.createCursor(row),
            };
        });
    }
    getStartCursor(edges) {
        let cursor = null;
        if (edges.length > 0) {
            cursor = edges[0].cursor;
        }
        return cursor;
    }
    getEndCursor(edges) {
        let cursor = null;
        if (edges.length > 0) {
            const [lastEdge] = edges.slice(-1);
            cursor = lastEdge.cursor;
        }
        return cursor;
    }
    getHasNextAndPrevious(result) {
        const { first, last, before, after, pageSize } = this;
        const hasMore = result.raw.length > pageSize;
        let hasNext;
        let hasPrevious;
        if (first) {
            hasNext = hasMore;
            hasPrevious = !!after;
        }
        else if (last) {
            hasNext = !!before;
            hasPrevious = hasMore;
        }
        return { hasNext, hasPrevious };
    }
    normalizeOrder(order) {
        var _a;
        const baseOrder = this.ensurePrimaryKeyInOrder(order);
        const normalized = {};
        for (const property in baseOrder) {
            const direction = baseOrder[property];
            const isAliased = property.includes('.');
            if (isAliased) {
                normalized[property] = direction;
                continue;
            }
            const alias = this.qb.expressionMap.mainAlias;
            const meta = (_a = alias === null || alias === void 0 ? void 0 : alias.metadata) === null || _a === void 0 ? void 0 : _a.findColumnWithPropertyName(property);
            const column = (meta === null || meta === void 0 ? void 0 : meta.databaseName) || property;
            normalized[`${alias === null || alias === void 0 ? void 0 : alias.name}.${column}`] = direction;
        }
        return normalized;
    }
    ensurePrimaryKeyInOrder(order) {
        const o = order;
        if (!o.hasOwnProperty('id')) {
            o.id = 'ASC';
        }
        return o;
    }
    applyOrder(order) {
        Object.entries(order).forEach(([column, direction], index) => {
            if (index === 0) {
                this.qb.orderBy(column, direction);
            }
            else {
                this.qb.addOrderBy(column, direction);
            }
        });
    }
    applyWhere(where, options) {
        const { columns, position, index, isBefore } = options;
        const column = columns[index];
        const expression = this.getColumnExpression(column);
        const isReversed = this.order[column] === 'DESC';
        const isDiscriminant = index >= columns.length - 1;
        const comparator = isBefore !== isReversed ? '<' : '>';
        const parameter = isBefore ? `_before_${index}` : `_after_${index}`;
        const totalOrder = `${expression} ${comparator} : ${parameter}`;
        const partialOrder = `${expression} ${comparator}= :${parameter}`;
        this.qb.setParameter(parameter, position[index]);
        if (isDiscriminant) {
            where.where(totalOrder);
        }
        else {
            where.where(partialOrder).andWhere(new typeorm_1.Brackets((andWhere) => andWhere.where(totalOrder).orWhere(new typeorm_1.Brackets((orWhere) => this.applyWhere(orWhere, {
                columns,
                position,
                index: index + 1,
                isBefore,
            })))));
        }
    }
    applyCursor(cursor, isBefore = false) {
        const columns = Object.keys(this.order);
        const position = this.decodeCursor(cursor);
        this.qb.andWhere(new typeorm_1.Brackets((where) => this.applyWhere(where, {
            columns,
            position,
            index: 0,
            isBefore,
        })));
    }
    reverseOrder(order) {
        const o = {};
        Object.entries(order).forEach(([column, direction]) => {
            o[column] = direction === 'ASC' ? 'DESC' : 'ASC';
        });
        return o;
    }
    createCursor(row) {
        return this.encodeCursor(this.getPosition(row));
    }
    encodeCursor(position) {
        const { _encoding, _delimiter } = this;
        const posStr = position.join(_delimiter);
        return Buffer.from(posStr).toString(_encoding);
    }
    decodeCursor(cursor) {
        const { _encoding, _delimiter } = this;
        const posStr = Buffer.from(cursor, _encoding).toString();
        return posStr.split(_delimiter).map((value) => JSON.parse(value));
    }
    getColumnExpression(column) {
        return column
            .replace('"', '')
            .split('.')
            .map(this.qb.connection.driver.escape)
            .join('.');
    }
    getPosition(row) {
        return Object.keys(this.order).map((column) => {
            const property = column.replace('.', '_');
            return JSON.stringify(row[property] || null);
        });
    }
}
exports.CursorPaginator = CursorPaginator;
//# sourceMappingURL=cursor.paginator.js.map