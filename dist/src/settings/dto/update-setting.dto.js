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
exports.UpdateSettingDto = exports.UpdateSettingInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const setting_entity_1 = require("../setting.entity");
let UpdateSettingInput = class UpdateSettingInput extends (0, graphql_1.PickType)(setting_entity_1.Setting, ['followerPostNoti'], graphql_1.InputType) {
};
UpdateSettingInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateSettingInput);
exports.UpdateSettingInput = UpdateSettingInput;
let UpdateSettingDto = class UpdateSettingDto {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSettingDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UpdateSettingInput),
    __metadata("design:type", UpdateSettingInput)
], UpdateSettingDto.prototype, "data", void 0);
UpdateSettingDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateSettingDto);
exports.UpdateSettingDto = UpdateSettingDto;
//# sourceMappingURL=update-setting.dto.js.map