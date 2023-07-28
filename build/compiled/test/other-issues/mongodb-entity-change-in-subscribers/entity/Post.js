"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const UpdateDateColumn_1 = require("../../../../src/decorator/columns/UpdateDateColumn");
const src_1 = require("../../../../src");
let Post = class Post {
    constructor() {
        this.active = false;
        this.updatedColumns = 0;
        this.loaded = false;
    }
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "active", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "updatedColumns", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map