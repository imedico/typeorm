"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
const Post_1 = require("./Post");
const src_1 = require("../../../../../../src");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "type", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "code", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.categoryWithJoinColumn),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postsWithJoinColumn", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.categoryWithOptions),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postsWithOptions", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.categoryWithNonPKColumns),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postsWithNonPKColumns", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, src_1.Unique)(["code", "version", "description"])
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map