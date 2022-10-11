import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
    ) {}

    isAttendance(userId: string) {
        const startDate = new Date();

        startDate.setHours(0, 0, 0);

        const endDate = new Date();

        endDate.setHours(23, 59, 59);

        return this.attendanceRepository.findOne({
            where: {
                createdAt: Between(startDate, endDate),
                user: {
                    id: userId,
                },
            },
        });
    }

    async createAttendance(userId: string) {
        const attendance = new Attendance();

        attendance.userId = userId;

        await this.attendanceRepository.save(attendance);

        return attendance;
    }

    async findOrCreate(userId: string) {
        let attendance = await this.isAttendance(userId);

        if (attendance === null) {
            attendance = await this.createAttendance(userId);
        }

        return attendance;
    }
}
