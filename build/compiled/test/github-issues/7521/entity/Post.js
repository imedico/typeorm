"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: `E.g. 'foo', 'bar', or 'baz' etc.`,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col1", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: `E.g. '''foo, 'bar''', or baz' etc.`,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: `E.g. "foo", "bar", or "baz" etc.`,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: "foo\\bar, bar\\baz, foo\\\\baz",
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: "foo: \0, bar: \0\0\0",
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col5", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: `"foo", ""bar""`,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col6", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: '"foo", ""bar""',
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col7", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: "foo \r \n \b \t Z % _ bar",
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        comment: "foo \\r \\n \\b \\t \\Z \\% \\_ bar",
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "col9", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map