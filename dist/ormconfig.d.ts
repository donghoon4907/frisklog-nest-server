import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import './src/common/env';
export declare const mysqlConfig: TypeOrmModuleOptions & DataSourceOptions;
