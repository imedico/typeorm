"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
const Post_1 = require("./Post");
const Image_1 = require("./Image");
const RelationId_1 = require("../../../../../../src/decorator/relations/RelationId");
let Category = class Category {
    constructor() {
        this.isRemoved = false;
    }
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Category.prototype, "isRemoved", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Image_1.Image),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "images", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((category) => category.images),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "imageIds", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((category) => category.images, "removedImages", (qb) => qb.andWhere("removedImages.isRemoved = :isRemoved", {
        isRemoved: true,
    })),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "removedImageIds", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((category) => category.posts),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postIds", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((category) => category.posts, "removedPosts", (qb) => qb.andWhere("removedPosts.isRemoved = :isRemoved", { isRemoved: true })),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "removedPostIds", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map