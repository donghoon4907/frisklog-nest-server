import { Type } from '@nestjs/common';
import { ICursorPaginatedType } from './cursor.interface';
export declare function CursorPaginated<T>(classRef: Type<T>): Type<ICursorPaginatedType<T>>;
