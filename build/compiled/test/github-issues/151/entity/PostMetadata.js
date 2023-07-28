"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMetadata = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Post_1 = require("./Post");
let PostMetadata = class PostMetadata {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostMetadata.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostMetadata.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.metadata),
    tslib_1.__metadata("design:type", Object)
], PostMetadata.prototype, "post", void 0);
PostMetadata = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostMetadata);
exports.PostMetadata = PostMetadata;
//# sourceMappingURL=PostMetadata.js.map