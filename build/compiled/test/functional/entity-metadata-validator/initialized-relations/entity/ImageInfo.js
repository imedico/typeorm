"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageInfo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const Image_1 = require("./Image");
let ImageInfo = class ImageInfo {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ImageInfo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ImageInfo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Image_1.Image, (image) => image.informations),
    tslib_1.__metadata("design:type", Image_1.Image)
], ImageInfo.prototype, "image", void 0);
ImageInfo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ImageInfo);
exports.ImageInfo = ImageInfo;
//# sourceMappingURL=ImageInfo.js.map