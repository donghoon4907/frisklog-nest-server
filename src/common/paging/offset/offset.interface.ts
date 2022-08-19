import { OffsetMetadata } from './offset.metadata';

export interface IOffsetPaginatedType<T> {
    nodes: T[];
    pageInfo: OffsetMetadata;
}
