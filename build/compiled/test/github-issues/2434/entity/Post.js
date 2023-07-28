"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "named_column", nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "namedColumn", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "POST" })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map