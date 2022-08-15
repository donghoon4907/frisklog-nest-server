import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { Directive, GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        UsersModule,
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
    ],
})
export class AppModule {}
