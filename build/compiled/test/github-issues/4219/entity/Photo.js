"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const shim_1 = require("../shim");
let Photo = class Photo {
};
tslib_1.__decorate([
    shim_1.Shim.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    shim_1.Shim.Column(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "url", void 0);
Photo = tslib_1.__decorate([
    shim_1.Shim.Entity()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map