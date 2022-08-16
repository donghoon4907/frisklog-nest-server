import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './user.subscriber';
import { DateScalar } from '../common/scalars/date.scalar';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersResolver, UserSubscriber, DateScalar],
})
export class UsersModule {}
