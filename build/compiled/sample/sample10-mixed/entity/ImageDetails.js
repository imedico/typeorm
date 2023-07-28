"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDetails = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Image_1 = require("./Image");
let ImageDetails = class ImageDetails {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ImageDetails.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ImageDetails.prototype, "meta", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ImageDetails.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Image_1.Image, (image) => image.details),
    tslib_1.__metadata("design:type", Image_1.Image)
], ImageDetails.prototype, "image", void 0);
ImageDetails = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_image_details")
], ImageDetails);
exports.ImageDetails = ImageDetails;
//# sourceMappingURL=ImageDetails.js.map