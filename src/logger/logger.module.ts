import { Module } from '@nestjs/common';
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike('frisklog', {
                            prettyPrint: true,
                        }),
                    ),
                }),
                new winstonDaily({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.printf(
                            (info) =>
                                `[${info.timestamp}] frisklog.${info.level}: ${info.message}`,
                        ),
                    ),
                    dirname: `${process.cwd()}/logs`,
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        }),
    ],
})
export class LoggerModule {}
