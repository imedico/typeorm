"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialPhoto = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Content_1 = require("./Content");
const Photo_1 = require("./Photo");
let SpecialPhoto = class SpecialPhoto extends Photo_1.Photo {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SpecialPhoto.prototype, "specialProperty", void 0);
SpecialPhoto = tslib_1.__decorate([
    (0, src_1.ChildEntity)(Content_1.ContentType.SpecialPhoto)
], SpecialPhoto);
exports.SpecialPhoto = SpecialPhoto;
//# sourceMappingURL=SpecialPhoto.js.map