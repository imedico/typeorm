"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const Category_1 = require("./Category");
let Post = class Post {
    constructor() {
        this.viewCount = 0;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({
        name: "s_post_id",
    }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.twoSidePosts),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "twoSideCategories", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "viewCount", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Category_1.Category, (category) => category.onePost),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "oneCategory", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category, (category) => category.twoSidePosts2),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "twoSideCategory", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.postsNamedColumn),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "categoriesNamedColumn", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category, (category) => category.onePostsNamedColumn),
    (0, JoinColumn_1.JoinColumn)({
        name: "s_category_named_column_id",
    }),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "categoryNamedColumn", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Category_1.Category, (category) => category.onePostNamedColumn),
    (0, JoinColumn_1.JoinColumn)({
        name: "s_one_category_named_column_id",
    }),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "oneCategoryNamedColumn", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map