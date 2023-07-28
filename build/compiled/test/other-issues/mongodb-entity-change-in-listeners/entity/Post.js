"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const BeforeUpdate_1 = require("../../../../src/decorator/listeners/BeforeUpdate");
const UpdateDateColumn_1 = require("../../../../src/decorator/columns/UpdateDateColumn");
const src_1 = require("../../../../src");
let Post = class Post {
    constructor() {
        this.loaded = false;
    }
    async beforeUpdate() {
        this.title += "!";
    }
    async afterLoad() {
        this.loaded = true;
    }
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "active", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, BeforeUpdate_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Post.prototype, "beforeUpdate", null);
tslib_1.__decorate([
    (0, src_1.AfterLoad)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Post.prototype, "afterLoad", null);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map