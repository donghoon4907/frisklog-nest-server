import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CursorMetadata {
    @Field()
    pageSize: number;

    @Field()
    totalCount: number;

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field({ nullable: true })
    startCursor: string;

    @Field({ nullable: true })
    endCursor: string;
}
