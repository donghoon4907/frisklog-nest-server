import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface IEdgeType<T> {
    cursor: string;
    node: T;
}

@ObjectType()
export class CursorPageInfo {
    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field({ nullable: true })
    startCursor: string;

    @Field({ nullable: true })
    endCursor: string;
}

export interface IPaginatedType<T> {
    edges: IEdgeType<T>[];
    nodes: T[];
    totalCount: number;
    pageInfo: CursorPageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType(`${classRef.name}Edge`)
    abstract class EdgeType {
        @Field((type) => String)
        cursor: string;

        @Field((type) => classRef)
        node: T;
    }

    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field((type) => [EdgeType], { nullable: true })
        edges: EdgeType[];

        @Field((type) => [classRef], { nullable: true })
        nodes: T[];

        @Field((type) => Int)
        totalCount: number;

        @Field((type) => CursorPageInfo)
        pageInfo: CursorPageInfo;
    }

    return PaginatedType as Type<IPaginatedType<T>>;
}