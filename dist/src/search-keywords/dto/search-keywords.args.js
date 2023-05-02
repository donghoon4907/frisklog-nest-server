"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchKeywordsArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const offset_args_1 = require("../../common/paging/offset/offset.args");
let SearchKeywordsArgs = class SearchKeywordsArgs extends offset_args_1.OffsetPaginatedArgs {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
SearchKeywordsArgs = __decorate([
    (0, graphql_1.ArgsType)()
], SearchKeywordsArgs);
exports.SearchKeywordsArgs = SearchKeywordsArgs;
//# sourceMappingURL=search-keywords.args.js.map