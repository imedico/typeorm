"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryWithVeryLongName = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const PostWithVeryLongName_1 = require("./PostWithVeryLongName");
let CategoryWithVeryLongName = class CategoryWithVeryLongName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CategoryWithVeryLongName.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "dummy name" }),
    tslib_1.__metadata("design:type", String)
], CategoryWithVeryLongName.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => PostWithVeryLongName_1.PostWithVeryLongName, (post) => post.categories),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], CategoryWithVeryLongName.prototype, "postsWithVeryLongName", void 0);
CategoryWithVeryLongName = tslib_1.__decorate([
    (0, src_1.Entity)()
], CategoryWithVeryLongName);
exports.CategoryWithVeryLongName = CategoryWithVeryLongName;
//# sourceMappingURL=CategoryWithVeryLongName.js.map