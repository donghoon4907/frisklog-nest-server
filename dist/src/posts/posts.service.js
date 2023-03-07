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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./post.entity");
const offset_paginator_1 = require("../common/paging/offset/offset.paginator");
const categories_service_1 = require("../categories/categories.service");
const notifications_service_1 = require("../notifications/notifications.service");
const post_interface_1 = require("./post.interface");
let PostsService = class PostsService {
    constructor(postsRepository, categoriesService, notificationsService) {
        this.postsRepository = postsRepository;
        this.categoriesService = categoriesService;
        this.notificationsService = notificationsService;
    }
    async posts(postsArgs) {
        const { offset, limit, searchKeyword, userId, visibility } = postsArgs;
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        if (searchKeyword) {
            qb.andWhere('post.content like :searchKeyword', {
                searchKeyword: `%${searchKeyword}%`,
            }).orWhere('user.nickname like :searchKeyword');
        }
        if (visibility) {
            qb.andWhere('post.visibility = :visibility', { visibility });
        }
        if (userId) {
            qb.andWhere('user.id = :userId', { userId });
        }
        const [posts, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(posts, total);
    }
    async findById(id) {
        return this.postsRepository.findOne({
            where: { id },
            withDeleted: true,
        });
    }
    async categoryPosts(categoryPostsArgs) {
        const { offset, limit, category } = categoryPostsArgs;
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoin('post.categories', 'categories')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('categories.content = :category', {
            category,
        })
            .where('post.visibility = :visibility', {
            visibility: post_interface_1.PostVisibility.PUBLIC,
        })
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        const [posts, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(posts, total);
    }
    async likePosts(likePostsArgs, authId) {
        const { offset, limit } = likePostsArgs;
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.likers', 'likers')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('likers.id = :authId', { authId })
            .where('post.visibility = :visibility', {
            visibility: post_interface_1.PostVisibility.PUBLIC,
        })
            .orderBy('post.createdAt', 'DESC');
        const [posts, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(posts, total);
    }
    async followingPosts(followingPostArgs, authId) {
        const { offset, limit, userId } = followingPostArgs;
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('user.followers', 'followers')
            .innerJoinAndSelect('followers.requester', 'requester')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('requester.id = :authId', { authId })
            .where('post.visibility = :visibility', {
            visibility: post_interface_1.PostVisibility.PUBLIC,
        })
            .orderBy('post.createdAt', 'DESC')
            .limit(limit)
            .offset(offset);
        if (userId) {
            qb.andWhere('user.id = :userId', {
                userId,
            });
        }
        const [posts, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(posts, total);
    }
    async removedPosts(removedPostsArgs, authId) {
        const { offset, limit } = removedPostsArgs;
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likedCount', 'post.likers')
            .loadRelationCountAndMap('post.commentCount', 'post.comments')
            .where('post.deletedAt is not null')
            .andWhere('user.id = :authId', { authId })
            .orderBy('post.createdAt', 'DESC')
            .withDeleted()
            .limit(limit)
            .offset(offset);
        const [posts, total] = await qb.getManyAndCount();
        const paginator = new offset_paginator_1.OffsetPaginator(offset, limit);
        return paginator.response(posts, total);
    }
    async create(createPostInput, user) {
        const { content, categories, visibility } = createPostInput;
        const post = new post_entity_1.Post();
        post.content = content;
        post.visibility = visibility;
        post.user = Promise.resolve(user);
        await this.setPostCategories(post, categories);
        const followers = await user.followers;
        for (let i = 0; i < followers.length; i++) {
            const target = await followers[i].requester;
            if (target.receivePostNotification) {
                await this.notificationsService.createNotification({
                    content: '새로운 포스트 작성',
                    url: `/user/${user.id}`,
                }, user, target);
            }
        }
        return post;
    }
    async update(updatePostInput, post) {
        const { content, categories, visibility } = updatePostInput;
        post.content = content;
        post.visibility = visibility;
        return this.setPostCategories(post, categories);
    }
    async setPostCategories(post, categories) {
        const postCategories = await post.categories;
        postCategories.splice(0, postCategories.length);
        for (let i = 0; i < categories.length; i++) {
            const category = await this.categoriesService.findOrCreate(categories[i]);
            if (category) {
                postCategories.push(category);
            }
        }
        await this.postsRepository.save(post);
        return post;
    }
    delete(post) {
        return this.postsRepository.softRemove(post);
    }
    async restore(post) {
        await this.postsRepository.restore(post.id);
        return post;
    }
    async like(post, me) {
        await this.postsRepository
            .createQueryBuilder('post')
            .relation('likers')
            .of(post)
            .add(me);
        const writer = await post.user;
        if (writer.receivePostNotification) {
            await this.notificationsService.createNotification({
                content: `나의 포스트에 좋아요`,
                url: `/user/${me.id}`,
            }, me, writer);
        }
    }
    unlike(post, me) {
        return this.postsRepository
            .createQueryBuilder('post')
            .relation('likers')
            .of(post)
            .remove(me);
    }
    async isLiked(postId, authId) {
        const isLiked = await this.postsRepository.findOne({
            where: {
                likers: {
                    id: authId,
                },
                id: postId,
            },
        });
        return isLiked !== null;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        notifications_service_1.NotificationsService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map