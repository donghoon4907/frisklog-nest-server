import { Resolver } from '@nestjs/graphql';

import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';

@Resolver((of) => Attendance)
export class AttendanceResolver {
    constructor(private readonly attendanceService: AttendanceService) {}
}
