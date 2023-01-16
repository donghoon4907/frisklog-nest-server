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
exports.SettingsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const setting_entity_1 = require("./setting.entity");
const settings_service_1 = require("./settings.service");
const auth_guard_1 = require("../users/auth/auth.guard");
const update_setting_dto_1 = require("./dto/update-setting.dto");
let SettingsResolver = class SettingsResolver {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async updateSetting(updateSettingDto) {
        const { id, data } = updateSettingDto;
        const setting = await this.settingsService.findById(id);
        if (setting === null) {
            throw new common_1.ForbiddenException('설정 정보를 찾을 수 없습니다');
        }
        return this.settingsService.updateSetting(data, setting);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => setting_entity_1.Setting),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_setting_dto_1.UpdateSettingDto]),
    __metadata("design:returntype", Promise)
], SettingsResolver.prototype, "updateSetting", null);
SettingsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => setting_entity_1.Setting),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsResolver);
exports.SettingsResolver = SettingsResolver;
//# sourceMappingURL=settings.resolver.js.map