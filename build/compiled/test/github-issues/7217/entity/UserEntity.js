"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var UserRole;
(function (UserRole) {
    UserRole["PLAYER"] = "PLAYER";
    UserRole["FULL_GAME"] = "FULL_GAME";
    UserRole["SUPERVISOR"] = "SUPERVISOR";
    UserRole["REPORTS"] = "REPORTS";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: UserRole,
        array: true,
        default: [UserRole.PLAYER],
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=UserEntity.js.map