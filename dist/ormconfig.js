"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConfig = void 0;
require("./src/common/env");
exports.mysqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    timezone: 'local',
    charset: 'utf8mb4',
};
//# sourceMappingURL=ormconfig.js.map