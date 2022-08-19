import { SelectQueryBuilder, Brackets, WhereExpressionBuilder } from 'typeorm';

import {
    Order,
    QueryResult,
    Row,
    IEdgeType,
    ICursorPaginatedType,
} from './cursor.interface';
import { CursorMetadata } from './cursor.metadata';

interface IOptions {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    order: Order;
}

export class CursorPaginator<T> {
    private readonly first: number | undefined;
    private readonly last: number | undefined;
    private readonly before: string | undefined;
    private readonly after: string | undefined;
    private readonly _encoding = 'base64';
    private readonly _delimiter = '|';

    protected order: Order;
    protected pageSize: number;

    constructor(protected qb: SelectQueryBuilder<T>, options: IOptions) {
        const { first, last, after, before, order = {} } = options;

        this.first = first;

        this.last = last;

        this.after = after;

        this.before = before;

        this.order = this.normalizeOrder(order);

        this.applyOrder(order);

        this.pageSize = (first ?? last) as number;

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

    public async paginate(): Promise<QueryResult<T>> {
        const { qb, pageSize } = this;

        return qb.limit(pageSize + 1).getRawAndEntities();
    }

    public async response(
        result: QueryResult<T>,
    ): Promise<ICursorPaginatedType<T>> {
        const { pageSize } = this;

        const { hasNext, hasPrevious } = this.getHasNextAndPrevious(result);

        const edges = this.getEdges(result);

        const totalCount = await this.getTotalCount();

        const pageInfo: CursorMetadata = {
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

    protected async getTotalCount(): Promise<number> {
        return this.qb.getCount();
    }

    protected getEdges(result: QueryResult<T>): IEdgeType<T>[] {
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

    protected getStartCursor(edges: IEdgeType<T>[]): string | null {
        let cursor = null;

        if (edges.length > 0) {
            cursor = edges[0].cursor;
        }

        return cursor;
    }

    protected getEndCursor(edges: IEdgeType<T>[]): string | null {
        let cursor = null;

        if (edges.length > 0) {
            const [lastEdge] = edges.slice(-1);

            cursor = lastEdge.cursor;
        }

        return cursor;
    }

    protected getHasNextAndPrevious(result: QueryResult<T>) {
        const { first, last, before, after, pageSize } = this;

        const hasMore = result.raw.length > pageSize;

        let hasNext: boolean;
        let hasPrevious: boolean;

        if (first) {
            hasNext = hasMore;
            hasPrevious = !!after;
        } else if (last) {
            hasNext = !!before;
            hasPrevious = hasMore;
        }

        return { hasNext, hasPrevious };
    }

    // set order in the form { alias.column: direction }
    protected normalizeOrder(order: Order): Order {
        const baseOrder = this.ensurePrimaryKeyInOrder(order);

        const normalized: Order = {};

        for (const property in baseOrder) {
            const direction = baseOrder[property];

            const isAliased = property.includes('.');

            if (isAliased) {
                normalized[property] = direction;

                continue;
            }

            const alias = this.qb.expressionMap.mainAlias;

            const meta = alias?.metadata?.findColumnWithPropertyName(property);

            const column = meta?.databaseName || property;

            normalized[`${alias?.name}.${column}`] = direction;
        }

        return normalized;
    }
    // add primary key to order
    protected ensurePrimaryKeyInOrder(order: Order): Order {
        const o = order;

        if (!o.hasOwnProperty('id')) {
            o.id = 'ASC';
        }

        return o;
    }

    protected applyOrder(order: Order): void {
        Object.entries(order).forEach(([column, direction], index) => {
            if (index === 0) {
                this.qb.orderBy(column, direction);
            } else {
                this.qb.addOrderBy(column, direction);
            }
        });
    }

    protected applyWhere(where: WhereExpressionBuilder, options: any): void {
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
        } else {
            where.where(partialOrder).andWhere(
                new Brackets((andWhere) =>
                    andWhere.where(totalOrder).orWhere(
                        new Brackets((orWhere) =>
                            this.applyWhere(orWhere, {
                                columns,
                                position,
                                index: index + 1,
                                isBefore,
                            }),
                        ),
                    ),
                ),
            );
        }
    }

    protected applyCursor(cursor: string, isBefore = false): void {
        const columns = Object.keys(this.order);

        const position = this.decodeCursor(cursor);

        this.qb.andWhere(
            new Brackets((where) =>
                this.applyWhere(where, {
                    columns,
                    position,
                    index: 0,
                    isBefore,
                }),
            ),
        );
    }

    protected reverseOrder(order: Order): Order {
        const o: Order = {};

        Object.entries(order).forEach(([column, direction]) => {
            o[column] = direction === 'ASC' ? 'DESC' : 'ASC';
        });

        return o;
    }

    protected createCursor(row: Row): string {
        return this.encodeCursor(this.getPosition(row));
    }

    protected encodeCursor(position: string[]): string {
        const { _encoding, _delimiter } = this;

        const posStr = position.join(_delimiter);

        return Buffer.from(posStr).toString(_encoding);
    }

    protected decodeCursor(cursor: string): string[] {
        const { _encoding, _delimiter } = this;

        const posStr = Buffer.from(cursor, _encoding).toString();

        return posStr.split(_delimiter).map((value) => JSON.parse(value));
    }

    protected getColumnExpression(column: string) {
        return column
            .replace('"', '')
            .split('.')
            .map(this.qb.connection.driver.escape)
            .join('.');
    }

    protected getPosition(row: Row) {
        return Object.keys(this.order).map((column) => {
            const property = column.replace('.', '_');

            return JSON.stringify(row[property] || null);
        });
    }
}
