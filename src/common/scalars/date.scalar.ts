import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as moment from 'moment';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
    description = '';

    parseValue(value: number): Date {
        return new Date(value);
    }

    serialize(value: Date): string {
        return moment(value).format(DEFAULT_FORMAT);
    }

    parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    }
}
