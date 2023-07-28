"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const Post_1 = require("./Post");
const Tag_1 = require("./Tag");
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
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.category),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "post", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.categoryWithOptions),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "postWithOptions", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.categoryWithNonPKColumns),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "postWithNonPKColumns", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag, (tag) => tag.category),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Category.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag, (tag) => tag.categoryWithOptions),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Category.prototype, "tagWithOptions", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag, (tag) => tag.categoryWithNonPKColumns),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Category.prototype, "tagWithNonPKColumns", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, src_1.Unique)(["code", "version", "description"])
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map