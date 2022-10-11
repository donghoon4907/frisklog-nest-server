import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attendance } from './attendance.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attendance])],
    providers: [AttendanceService, AttendanceResolver],
    exports: [AttendanceService],
})
export class AttendanceModule {}
