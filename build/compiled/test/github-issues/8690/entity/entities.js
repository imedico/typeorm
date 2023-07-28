"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
// This is a contrived and silly example of a primary
// column transformer but it's enough to show the issue.
const WrappedIntTransformer = {
    from: (value) => `"${value}"`,
    to: (value) => value ? parseInt(value.slice(1, value.length - 1)) : null,
};
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({
        type: Number,
        transformer: WrappedIntTransformer,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Photo, (photo) => photo.user),
    tslib_1.__metadata("design:type", Promise)
], User.prototype, "photos", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({
        type: Number,
        transformer: WrappedIntTransformer,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "url", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: Number,
        transformer: WrappedIntTransformer,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User, (user) => user.photos),
    (0, src_1.JoinColumn)({ name: "userId", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", Promise)
], Photo.prototype, "user", void 0);
Photo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=entities.js.map