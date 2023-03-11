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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const attendance_entity_1 = require("./attendance.entity");
const attendance_service_1 = require("./attendance.service");
let AttendanceResolver = class AttendanceResolver {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
};
AttendanceResolver = __decorate([
    (0, graphql_1.Resolver)((of) => attendance_entity_1.Attendance),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceResolver);
exports.AttendanceResolver = AttendanceResolver;
//# sourceMappingURL=attendance.resolver.js.map