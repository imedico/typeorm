"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMeta = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let UserMeta = class UserMeta {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserMeta.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserMeta.prototype, "foo", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserMeta.prototype, "bar", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], UserMeta.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => User_1.User),
    (0, src_1.JoinColumn)({ name: "userId", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", User_1.User)
], UserMeta.prototype, "user", void 0);
UserMeta = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserMeta);
exports.UserMeta = UserMeta;
//# sourceMappingURL=UserMeta.js.map