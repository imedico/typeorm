"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const src_2 = require("../../../../../../src");
const src_3 = require("../../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_2.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("varchar", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("nvarchar", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nvarchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("alphanum", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "alphanum", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("shorttext", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "shorttext", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("varbinary", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", Buffer)
], Post.prototype, "varbinary", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map