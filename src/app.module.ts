import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UsersModule } from './users/users.module';
// import { LoggingPlugin } from './common/plugins/logging.plugin';
import { PlatformsModule } from './platforms/platforms.module';
import { mysqlConfig } from '../ormconfig';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
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
})
export class AppModule {}
