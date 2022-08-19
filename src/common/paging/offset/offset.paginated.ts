import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

import { OffsetMetadata } from './offset.metadata';
import { IOffsetPaginatedType } from './offset.interface';

export function OffsetPaginated<T>(
    classRef: Type<T>,
): Type<IOffsetPaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IOffsetPaginatedType<T> {
        @Field((type) => [classRef], { nullable: true })
        nodes: T[];

        @Field((type) => OffsetMetadata)
        pageInfo: OffsetMetadata;
    }

    return PaginatedType as Type<IOffsetPaginatedType<T>>;
}
