"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const Joi = require("joi");
const path_1 = require("path");
const ormconfig_1 = require("../ormconfig");
const users_module_1 = require("./users/users.module");
const platforms_module_1 = require("./platforms/platforms.module");
const posts_module_1 = require("./posts/posts.module");
const comments_module_1 = require("./comments/comments.module");
const categories_module_1 = require("./categories/categories.module");
const attendance_module_1 = require("./attendance/attendance.module");
const notifications_module_1 = require("./notifications/notifications.module");
const github_module_1 = require("./github/github.module");
const photos_module_1 = require("./photos/photos.module");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), '/public'),
                exclude: ['/graphql'],
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                validationSchema: Joi.object({
                    DB: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    EMAIL_ID: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                    GITHUB_CLIENT_ID: Joi.string().required(),
                    GITHUB_CLIENT_SECRET: Joi.string().required(),
                    FRONTEND_HOST: Joi.string().required(),
                    BACKEND_HOST: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.mysqlConfig),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                cache: 'bounded',
                autoSchemaFile: 'schema.gql',
                playground: true,
            }),
            users_module_1.UsersModule,
            platforms_module_1.PlatformsModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            categories_module_1.CategoriesModule,
            attendance_module_1.AttendanceModule,
            notifications_module_1.NotificationsModule,
            github_module_1.GithubModule,
            photos_module_1.PhotosModule,
            upload_module_1.UploadModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map