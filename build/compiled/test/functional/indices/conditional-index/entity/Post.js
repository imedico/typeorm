"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Index_1 = require("../../../../../src/decorator/Index");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Index_1.Index)({ where: `"version" IS NOT NULL AND "version" > 0` }),
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "version", void 0);
Post = tslib_1.__decorate([
    (0, Index_1.Index)(["name", "text"], { where: `"name" IS NOT NULL AND "text" IS NOT NULL` }),
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map