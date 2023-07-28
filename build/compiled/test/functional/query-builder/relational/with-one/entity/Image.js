"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const Post_1 = require("./Post");
let Image = class Image {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "url", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.image),
    tslib_1.__metadata("design:type", Post_1.Post)
], Image.prototype, "post", void 0);
Image = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Image);
exports.Image = Image;
//# sourceMappingURL=Image.js.map