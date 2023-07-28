"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPhoto = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
const Photo_1 = require("./Photo");
let UserPhoto = class UserPhoto {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], UserPhoto.prototype, "isProfilePhoto", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.userPhotos, { nullable: false }),
    tslib_1.__metadata("design:type", User_1.User)
], UserPhoto.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Object)
], UserPhoto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Photo_1.Photo, (photo) => photo.userPhotos, { nullable: false }),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], UserPhoto.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Object)
], UserPhoto.prototype, "photoId", void 0);
UserPhoto = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserPhoto);
exports.UserPhoto = UserPhoto;
//# sourceMappingURL=UserPhoto.js.map