"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const CreateDateColumn_1 = require("../../../../src/decorator/columns/CreateDateColumn");
const UpdateDateColumn_1 = require("../../../../src/decorator/columns/UpdateDateColumn");
const VersionColumn_1 = require("../../../../src/decorator/columns/VersionColumn");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, CreateDateColumn_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "createDate", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: 100 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "order", void 0);
tslib_1.__decorate([
    (0, VersionColumn_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "triggerValue", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map