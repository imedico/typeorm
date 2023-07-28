"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int64"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int64", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("string"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "string", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("float64"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "float64", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bytes"),
    tslib_1.__metadata("design:type", Buffer
    // -------------------------------------------------------------------------
    // Numeric Types
    // -------------------------------------------------------------------------
    )
], Post.prototype, "bytes", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("numeric"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "numeric", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("date"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "date", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date
    // -------------------------------------------------------------------------
    // Other Types
    // -------------------------------------------------------------------------
    )
], Post.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bool"),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "bool", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("json"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "json", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("string", { array: true }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "array", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map