"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithVeryLongName = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const AuthorWithVeryLongName_1 = require("./AuthorWithVeryLongName");
const src_1 = require("../../../../src");
const CategoryWithVeryLongName_1 = require("./CategoryWithVeryLongName");
let PostWithVeryLongName = class PostWithVeryLongName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithVeryLongName.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "dummy name" }),
    tslib_1.__metadata("design:type", String)
], PostWithVeryLongName.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => AuthorWithVeryLongName_1.AuthorWithVeryLongName, (author) => author.postsWithVeryLongName),
    tslib_1.__metadata("design:type", AuthorWithVeryLongName_1.AuthorWithVeryLongName)
], PostWithVeryLongName.prototype, "authorWithVeryLongName", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => CategoryWithVeryLongName_1.CategoryWithVeryLongName, (category) => category.postsWithVeryLongName),
    tslib_1.__metadata("design:type", Array)
], PostWithVeryLongName.prototype, "categories", void 0);
PostWithVeryLongName = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostWithVeryLongName);
exports.PostWithVeryLongName = PostWithVeryLongName;
//# sourceMappingURL=PostWithVeryLongName.js.map