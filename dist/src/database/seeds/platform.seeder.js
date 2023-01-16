"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path = require("path");
const ormconfig_1 = require("../../../ormconfig");
const platform_entity_1 = require("../../platforms/platform.entity");
const PLATFORM_DATA = [
    {
        platformName: 'frisklog',
        logoUrl: `${process.env.BACKEND_ROOT}/frisklog-icon.png`,
        domainUrl: process.env.FRONTEND_ROOT,
    },
    {
        platformName: 'github',
        logoUrl: `${process.env.BACKEND_ROOT}/github-icon.png`,
        domainUrl: 'https://github.com',
    },
];
(async () => {
    const AppDataSource = await new typeorm_1.DataSource(Object.assign(Object.assign({}, ormconfig_1.mysqlConfig), { entities: [path.join(process.cwd(), '/src/**/*.entity.{js,ts}')] })).initialize();
    const repository = AppDataSource.getRepository(platform_entity_1.Platform);
    await repository.upsert(PLATFORM_DATA, ['platformName']);
    console.log('fin platform seeding');
})();
//# sourceMappingURL=platform.seeder.js.map