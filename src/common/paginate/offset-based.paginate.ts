import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

@ObjectType()
export class OffsetPageInfo {
    @Field()
    currentPage: number;

    @Field()
    lastPage: number;

    @Field()
    pageSize: number;

    @Field()
    nodeCount: number;

    @Field()
    totalCount: number;
}

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
