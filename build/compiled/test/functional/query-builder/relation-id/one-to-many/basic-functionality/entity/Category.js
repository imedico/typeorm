"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../../../src/decorator/relations/ManyToOne");
const OneToMany_1 = require("../../../../../../../src/decorator/relations/OneToMany");
const Image_1 = require("./Image");
const Post_1 = require("./Post");
let Category = class Category {
    constructor() {
        this.isRemoved = false;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Category.prototype, "isRemoved", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Image_1.Image, (image) => image.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "images", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "post", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map