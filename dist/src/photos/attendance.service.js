"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    isAttendance(userId) {
        const startDate = new Date();
        startDate.setHours(0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59);
        return this.attendanceRepository.findOne({
            where: {
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
                user: {
                    id: userId,
                },
            },
        });
    }
    async createAttendance(userId) {
        const attendance = new attendance_entity_1.Attendance();
        attendance.userId = userId;
        await this.attendanceRepository.save(attendance);
        return attendance;
    }
    async findOrCreate(userId) {
        let attendance = await this.isAttendance(userId);
        if (attendance === null) {
            attendance = await this.createAttendance(userId);
        }
        return attendance;
    }
};
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map