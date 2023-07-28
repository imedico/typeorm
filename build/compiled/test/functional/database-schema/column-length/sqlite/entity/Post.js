"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("character", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "character", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("varchar", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("varying character", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varying_character", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("nchar", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nchar", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("native character", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "native_character", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("nvarchar", {
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nvarchar", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map