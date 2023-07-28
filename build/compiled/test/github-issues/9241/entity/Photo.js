"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserPhoto_1 = require("./UserPhoto");
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
    (0, src_1.OneToMany)(() => UserPhoto_1.UserPhoto, (userPhoto) => userPhoto.photo, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Photo.prototype, "userPhotos", void 0);
Photo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map