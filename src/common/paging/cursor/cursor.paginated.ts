import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

import { CursorMetadata } from './cursor.metadata';
import { ICursorPaginatedType } from './cursor.interface';

export function CursorPaginated<T>(
    classRef: Type<T>,
): Type<ICursorPaginatedType<T>> {
    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType {
        @Field((type) => String)
        cursor: string;

        @Field((type) => classRef)
        node: T;
    }

    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements ICursorPaginatedType<T> {
        @Field((type) => [EdgeType], { nullable: true })
        edges: EdgeType[];

        @Field((type) => CursorMetadata)
        pageInfo: CursorMetadata;
    }

    return PaginatedType as Type<ICursorPaginatedType<T>>;
}
