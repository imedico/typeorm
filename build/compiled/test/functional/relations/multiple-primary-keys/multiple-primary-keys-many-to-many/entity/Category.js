"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Post_1 = require("./Post");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const Tag_1 = require("./Tag");
const src_1 = require("../../../../../../src");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(String, {
        length: 31,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(String, {
        length: 31,
    }),
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
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categoriesWithOptions),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postsWithOptions", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categoriesWithNonPKColumns),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "postsWithNonPKColumns", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Tag_1.Tag, (tag) => tag.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Tag_1.Tag, (tag) => tag.categoriesWithOptions),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "tagsWithOptions", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Tag_1.Tag, (tag) => tag.categoriesWithNonPKColumns),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "tagsWithNonPKColumns", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, src_1.Unique)(["code", "version", "description"])
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map