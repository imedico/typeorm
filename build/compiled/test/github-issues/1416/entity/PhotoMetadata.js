"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoMetadata = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Photo_1 = require("./Photo");
let PhotoMetadata = class PhotoMetadata {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PhotoMetadata.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], PhotoMetadata.prototype, "height", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], PhotoMetadata.prototype, "width", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PhotoMetadata.prototype, "orientation", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], PhotoMetadata.prototype, "compressed", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PhotoMetadata.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Photo_1.Photo, (photo) => photo.metadata),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], PhotoMetadata.prototype, "photo", void 0);
PhotoMetadata = tslib_1.__decorate([
    (0, index_1.Entity)()
], PhotoMetadata);
exports.PhotoMetadata = PhotoMetadata;
//# sourceMappingURL=PhotoMetadata.js.map