import { DataSource } from 'typeorm';
import * as path from 'path';

import { mysqlConfig } from '../../../ormconfig';
import { Platform } from '../../platforms/platform.entity';

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
    const AppDataSource = await new DataSource({
        ...mysqlConfig,
        entities: [path.join(process.cwd(), '/src/**/*.entity.{js,ts}')],
    }).initialize();

    const repository = AppDataSource.getRepository(Platform);

    await repository.upsert(PLATFORM_DATA, ['platformName']);
})();
