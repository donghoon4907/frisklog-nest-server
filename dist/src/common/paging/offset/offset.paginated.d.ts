import { Type } from '@nestjs/common';
import { IOffsetPaginatedType } from './offset.interface';
export declare function OffsetPaginated<T>(classRef: Type<T>): Type<IOffsetPaginatedType<T>>;
