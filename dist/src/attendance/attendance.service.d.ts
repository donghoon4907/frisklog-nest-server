import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
export declare class AttendanceService {
    private readonly attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    isAttendance(userId: string): Promise<Attendance>;
    createAttendance(userId: string): Promise<Attendance>;
    findOrCreate(userId: string): Promise<Attendance>;
}
