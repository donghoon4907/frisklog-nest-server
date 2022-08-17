import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

import { OffsetPageInfo } from './page-info.entity';

export interface IPaginatedType<T> {
    nodes: T[];
    pageInfo: OffsetPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field((type) => [classRef], { nullable: true })
        nodes: T[];

        @Field((type) => OffsetPageInfo)
        pageInfo: OffsetPageInfo;
    }

    return PaginatedType as Type<IPaginatedType<T>>;
}
