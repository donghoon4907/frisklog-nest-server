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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
let CommentsService = class CommentsService {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async comments(commentsArgs) {
        const { offset, limit, postId } = commentsArgs;
        const [comments, total] = await this.commentsRepository.findAndCount({
            where: {
                post: {
                    id: postId,
                },
            },
            relations: {
                user: true,
                post: true,
            },
            skip: offset,
            take: limit,
            order: {
                id: 'DESC',
            },
        });
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(comments, total);
    }
    async findOneById(id) {
        return this.commentsRepository.findOneBy({ id });
    }
    async create(createCommentDto, user) {
        const { content, postId } = createCommentDto;
        const comment = new comment_entity_1.Comment();
        comment.content = content;
        comment.postId = postId;
        comment.user = user;
        return this.commentsRepository.save(comment);
    }
    async update(updateCommentInput, comment) {
        const { content } = updateCommentInput;
        comment.content = content;
        return this.commentsRepository.save(comment);
    }
    async delete(comment) {
        return this.commentsRepository.softRemove(comment);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map