"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Album_1 = require("./Album");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "albumId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Album_1.Album),
    (0, src_1.JoinColumn)({ name: "albumId" }),
    tslib_1.__metadata("design:type", Album_1.Album)
], Photo.prototype, "album", void 0);
Photo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map