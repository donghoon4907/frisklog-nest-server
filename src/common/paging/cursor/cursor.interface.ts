import { CursorMetadata } from './cursor.metadata';

export type Direction = 'ASC' | 'DESC';

export type Row = Record<string, Date | string | number | object>;

export type Order = Record<string, Direction>;

export interface QueryResult<T> {
    entities: T[];
    raw: Row[];
}

export interface IEdgeType<T> {
    node: T;
    cursor: string;
}

export interface ICursorPaginatedType<T> {
    edges: IEdgeType<T>[];
    pageInfo: CursorMetadata;
}
