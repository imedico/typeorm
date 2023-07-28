"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const Post_1 = require("./Post");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({
        name: "s_category_id",
    }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.oneCategory),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "onePost", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.twoSideCategories),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "twoSidePosts", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.twoSideCategory),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "twoSidePosts2", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categoriesNamedAll),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "postsNamedAll", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.categoryNamedAll),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "onePostsNamedAll", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.oneCategoryNamedAll),
    tslib_1.__metadata("design:type", Promise)
], Category.prototype, "onePostNamedAll", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)("s_category_named_all", {
        orderBy: {
            id: "ASC",
        },
    })
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map