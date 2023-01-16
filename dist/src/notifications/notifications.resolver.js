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
exports.NotificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const notification_entity_1 = require("./notification.entity");
const read_notifications_dto_1 = require("./dto/read-notifications.dto");
const notifications_response_1 = require("./dto/notifications.response");
const notifications_args_1 = require("./dto/notifications.args");
const auth_decorator_1 = require("../users/auth/auth.decorator");
const auth_guard_1 = require("../users/auth/auth.guard");
const user_entity_1 = require("../users/user.entity");
const delete_notifications_dto_1 = require("./dto/delete-notifications.dto");
let NotificationsResolver = class NotificationsResolver {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    notifications(me, notificationsArgs) {
        return this.notificationsService.notifications(notificationsArgs, me.id);
    }
    readNotifications(readNotificationsDto) {
        return this.notificationsService.readNotifications(readNotificationsDto);
    }
    deleteNotifications(deleteNotificationsDto) {
        return this.notificationsService.deleteNotifications(deleteNotificationsDto);
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => notifications_response_1.OffsetPaginatedNotification),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        notifications_args_1.NotificationsArgs]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "notifications", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => [notification_entity_1.Notification]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [read_notifications_dto_1.ReadNotificationsDto]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "readNotifications", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => [notification_entity_1.Notification]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_notifications_dto_1.DeleteNotificationsDto]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "deleteNotifications", null);
NotificationsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => notification_entity_1.Notification),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsResolver);
exports.NotificationsResolver = NotificationsResolver;
//# sourceMappingURL=notifications.resolver.js.map