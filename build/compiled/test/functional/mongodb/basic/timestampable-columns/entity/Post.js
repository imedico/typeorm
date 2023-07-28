"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ObjectIdColumn_1 = require("../../../../../../src/decorator/columns/ObjectIdColumn");
const typings_1 = require("../../../../../../src/driver/mongodb/typings");
const CreateDateColumn_1 = require("../../../../../../src/decorator/columns/CreateDateColumn");
const UpdateDateColumn_1 = require("../../../../../../src/decorator/columns/UpdateDateColumn");
let Post = class Post {
};
tslib_1.__decorate([
    (0, ObjectIdColumn_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "message", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, CreateDateColumn_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map