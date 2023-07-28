"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ObjectIdColumn_1 = require("../../../../../../src/decorator/columns/ObjectIdColumn");
const Index_1 = require("../../../../../../src/decorator/Index");
const typings_1 = require("../../../../../../src/driver/mongodb/typings");
let Post = class Post {
};
tslib_1.__decorate([
    (0, ObjectIdColumn_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)({ unique: true }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "count", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)(["title", "name"]),
    (0, Index_1.Index)(() => ({ title: -1, name: -1, count: 1 })),
    (0, Index_1.Index)("title_name_count", () => ({ title: 1, name: 1, count: 1 })),
    (0, Index_1.Index)("title_name_count_reversed", () => ({ title: -1, name: -1, count: -1 })),
    (0, Index_1.Index)("count_in_background", () => ({ count: -1 }), { background: true }),
    (0, Index_1.Index)("count_expire", () => ({ title: -1 }), { expireAfterSeconds: 3600 })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map