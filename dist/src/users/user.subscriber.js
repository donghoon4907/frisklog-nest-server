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
exports.UserSubscriber = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserSubscriber = class UserSubscriber {
    constructor(dataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return user_entity_1.User;
    }
    afterLoad(user) {
        user.link = `/user/${user.id}`;
        const { status } = user;
        let statusText = null;
        if (status === 'online') {
            statusText = '온라인';
        }
        else if (status === 'offline') {
            statusText = '오프라인';
        }
        else if (status === 'away') {
            statusText = '자리비움';
        }
        else if (status === 'busy') {
            statusText = '바쁨';
        }
        user.statusText = statusText;
    }
};
UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
//# sourceMappingURL=user.subscriber.js.map