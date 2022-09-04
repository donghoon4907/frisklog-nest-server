import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { join } from 'path';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UsersModule } from './users/users.module';
// import { LoggingPlugin } from './common/plugins/logging.plugin';
import { PlatformsModule } from './platforms/platforms.module';
import { mysqlConfig } from '../ormconfig';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { UploadController } from './upload/upload.controller';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), '/upload'),
        }),
        MulterModule.register({
            dest: './upload',
        }),
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production')
                    .default('development'),
                DB: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                EMAIL_ID: Joi.string().required(),
                EMAIL_PASSWORD: Joi.string().required(),
                GITHUB_CLIENT_ID: Joi.string().required(),
                GITHUB_CLIENT_SECRET: Joi.string().required(),
                BACKEND_ROOT: Joi.string().required(),
                FRONTEND_ROOT: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRoot(mysqlConfig),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            transformSchema: (schema) =>
                upperDirectiveTransformer(schema, 'upper'),
            installSubscriptionHandlers: true,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
        }),
        UsersModule,
        PlatformsModule,
        PostsModule,
        CommentsModule,
        CategoriesModule,
    ],
    providers: [],
    controllers: [UploadController],
})
export class AppModule {}
