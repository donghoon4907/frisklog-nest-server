import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { Order, QueryResult, Row, IEdgeType, ICursorPaginatedType } from './cursor.interface';
interface IOptions {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    order: Order;
}
export declare class CursorPaginator<T> {
    protected qb: SelectQueryBuilder<T>;
    private readonly first;
    private readonly last;
    private readonly before;
    private readonly after;
    private readonly _encoding;
    private readonly _delimiter;
    protected order: Order;
    protected pageSize: number;
    constructor(qb: SelectQueryBuilder<T>, options: IOptions);
    paginate(): Promise<QueryResult<T>>;
    response(result: QueryResult<T>): Promise<ICursorPaginatedType<T>>;
    protected getTotalCount(): Promise<number>;
    protected getEdges(result: QueryResult<T>): IEdgeType<T>[];
    protected getStartCursor(edges: IEdgeType<T>[]): string | null;
    protected getEndCursor(edges: IEdgeType<T>[]): string | null;
    protected getHasNextAndPrevious(result: QueryResult<T>): {
        hasNext: boolean;
        hasPrevious: boolean;
    };
    protected normalizeOrder(order: Order): Order;
    protected ensurePrimaryKeyInOrder(order: Order): Order;
    protected applyOrder(order: Order): void;
    protected applyWhere(where: WhereExpressionBuilder, options: any): void;
    protected applyCursor(cursor: string, isBefore?: boolean): void;
    protected reverseOrder(order: Order): Order;
    protected createCursor(row: Row): string;
    protected encodeCursor(position: string[]): string;
    protected decodeCursor(cursor: string): string[];
    protected getColumnExpression(column: string): string;
    protected getPosition(row: Row): string[];
}
export {};
