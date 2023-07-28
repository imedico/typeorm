"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "text", void 0);
Photo = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Unique)(["name"]),
    (0, src_1.Index)(["text"], { unique: true })
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map