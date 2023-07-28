"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let UserProfile = class UserProfile {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserProfile.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => User_1.User, (user) => user.profile),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], UserProfile.prototype, "user", void 0);
UserProfile = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserProfile);
exports.UserProfile = UserProfile;
//# sourceMappingURL=UserProfile.js.map