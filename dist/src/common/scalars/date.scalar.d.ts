import { CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
export declare class DateScalar implements CustomScalar<string, Date> {
    description: string;
    parseValue(value: number): Date;
    serialize(value: Date): string;
    parseLiteral(ast: ValueNode): Date;
}
