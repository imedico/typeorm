"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryColumn");
const Post_1 = require("./Post");
const Image_1 = require("./Image");
const OneToOne_1 = require("../../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../../src/decorator/relations/JoinColumn");
let Category = class Category {
    constructor() {
        this.isRemoved = false;
    }
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "code", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Category.prototype, "isRemoved", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.category),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "post", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Image_1.Image, (image) => image.category),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Image_1.Image)
], Category.prototype, "image", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map