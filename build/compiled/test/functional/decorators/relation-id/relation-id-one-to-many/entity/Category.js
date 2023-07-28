"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
const RelationId_1 = require("../../../../../../src/decorator/relations/RelationId");
const Post_1 = require("./Post");
let Category = class Category {
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
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
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