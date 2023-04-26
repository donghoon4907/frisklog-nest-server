import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
// import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { join } from 'path';
import { mysqlConfig } from 'ormconfig';

// import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UsersModule } from './users/users.module';
// import { LoggingPlugin } from './common/plugins/logging.plugin';
import { PlatformsModule } from './platforms/platforms.module';
// import { mysqlConfig } from '../ormconfig';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationsModule } from './notifications/notifications.module';
import { GithubModule } from './github/github.module';
import { PhotosModule } from './photos/photos.module';
import { UploadModule } from './upload/upload.module';
// import { SettingsModule } from './settings/settings.module';
import { LoggerModule } from './logger/logger.module';
import { GoogleModule } from './google/google.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), '/public'),
            exclude: ['/graphql'],
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            validationSchema: Joi.object({
                // NODE_ENV: Joi.string()
                //     .valid('development', 'production')
                //     .default('development'),
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
                CRYPTO_SECRET: Joi.string().required(),
                NAVER_CLIENT_ID: Joi.string().required(),
                NAVER_CLIENT_SECRET: Joi.string().required(),
                REDIRECT_URI: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot(mysqlConfig),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            cache: 'bounded',
            autoSchemaFile: 'schema.gql',
            // transformSchema: (schema) =>
            //     upperDirectiveTransformer(schema, 'upper'),
            // installSubscriptionHandlers: true,
            playground: true,
            // plugins: [ApolloServerPluginLandingPageLocalDefault()],
            // buildSchemaOptions: {
            //     directives: [
            //         new GraphQLDirective({
            //             name: 'upper',
            //             locations: [DirectiveLocation.FIELD_DEFINITION],
            //         }),
            //     ],
            // },
        }),
        UsersModule,
        PlatformsModule,
        PostsModule,
        CommentsModule,
        CategoriesModule,
        AttendanceModule,
        NotificationsModule,
        GithubModule,
        PhotosModule,
        UploadModule,
        LoggerModule,
        GoogleModule,
    ],
    providers: [],
})
export class AppModule {}
