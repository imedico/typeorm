"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostV2 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let PostV2 = class PostV2 {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], PostV2.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostV2.prototype, "title", void 0);
PostV2 = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostV2);
exports.PostV2 = PostV2;
//# sourceMappingURL=PostV2.js.map