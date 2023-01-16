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
exports.CreateUserDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../user.entity");
let CreateUserRequiredInput = class CreateUserRequiredInput extends (0, graphql_1.PickType)(user_entity_1.User, ['nickname'], graphql_1.InputType) {
};
CreateUserRequiredInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserRequiredInput);
let CreateUserOptionalInput = class CreateUserOptionalInput extends (0, graphql_1.PartialType)((0, graphql_1.PickType)(user_entity_1.User, ['avatar'], graphql_1.InputType)) {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserOptionalInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserOptionalInput.prototype, "githubId", void 0);
CreateUserOptionalInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserOptionalInput);
let CreateUserDto = class CreateUserDto extends (0, graphql_1.IntersectionType)(CreateUserRequiredInput, CreateUserOptionalInput) {
};
CreateUserDto = __decorate([
    (0, graphql_1.InputType)()
], CreateUserDto);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map