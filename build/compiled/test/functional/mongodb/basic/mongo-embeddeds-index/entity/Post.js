"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ObjectIdColumn_1 = require("../../../../../../src/decorator/columns/ObjectIdColumn");
const Index_1 = require("../../../../../../src/decorator/Index");
const typings_1 = require("../../../../../../src/driver/mongodb/typings");
const Information_1 = require("./Information");
let Post = class Post {
};
tslib_1.__decorate([
    (0, ObjectIdColumn_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(() => Information_1.Information),
    tslib_1.__metadata("design:type", Information_1.Information)
], Post.prototype, "info", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("info_description", ["info.description"])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map