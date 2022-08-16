import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';

export const mysqlConfig: TypeOrmModuleOptions & DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    autoLoadEntities: true,
    entities: [path.join(process.cwd(), '/src/**/*.entity.{js,ts}')],
    synchronize: true,
    logging: true,
    timezone: 'local',
    charset: 'utf8mb4',
};
