"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_2.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_3.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "version", void 0);
tslib_1.__decorate([
    (0, src_3.Column)({ type: "jsonb" }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "problems", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map