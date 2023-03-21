"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.Console({
                        level: 'info',
                        format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('frisklog', {
                            prettyPrint: true,
                        })),
                    }),
                    new winstonDaily({
                        level: 'info',
                        format: winston.format.combine(winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.printf((info) => `[${info.timestamp}] frisklog.${info.level}: ${info.message}`)),
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
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map