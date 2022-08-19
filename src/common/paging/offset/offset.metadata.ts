import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OffsetMetadata {
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
