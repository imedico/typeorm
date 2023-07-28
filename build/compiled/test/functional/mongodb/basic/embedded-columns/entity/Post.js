"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ObjectIdColumn_1 = require("../../../../../../src/decorator/columns/ObjectIdColumn");
const Counters_1 = require("./Counters");
const typings_1 = require("../../../../../../src/driver/mongodb/typings");
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
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Post.prototype, "counters", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map