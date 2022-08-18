import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './user.subscriber';
import { DateScalar } from '../common/scalars/date.scalar';

@Module({
    imports: [TypeOrmModule.forFeature([User]), HttpModule],
    providers: [UsersService, UsersResolver, UserSubscriber, DateScalar],
})
export class UsersModule {}
