import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSubscriber } from './user.subscriber';
import { DateScalar } from '../common/scalars/date.scalar';
import { Follow } from './follow.entity';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Follow]),
        forwardRef(() => AttendanceModule),
        HttpModule,
    ],
    providers: [UsersService, UsersResolver, UserSubscriber, DateScalar],
})
export class UsersModule {}
