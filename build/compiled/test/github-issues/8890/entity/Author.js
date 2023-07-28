"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = require("./Post");
let Author = class Author {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Author.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Author.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Author.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Author.prototype, "age", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Post_1.Post, (post) => post.author),
    tslib_1.__metadata("design:type", Array)
], Author.prototype, "posts", void 0);
Author = tslib_1.__decorate([
    (0, src_1.Entity)()
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map