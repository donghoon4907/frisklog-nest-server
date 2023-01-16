import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import './src/common/env';

export const mysqlConfig: TypeOrmModuleOptions & DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    timezone: 'local',
    charset: 'utf8mb4',
};
