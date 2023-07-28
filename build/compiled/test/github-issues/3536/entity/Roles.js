"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.AccountPermission = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var AccountPermission;
(function (AccountPermission) {
    AccountPermission[AccountPermission["Thing1"] = 1] = "Thing1";
    AccountPermission[AccountPermission["Thing2"] = 4] = "Thing2";
    AccountPermission[AccountPermission["Thing3"] = 3] = "Thing3";
    AccountPermission[AccountPermission["Thing4"] = 2] = "Thing4";
})(AccountPermission = exports.AccountPermission || (exports.AccountPermission = {}));
let Roles = class Roles {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("enum", { enum: AccountPermission, array: true, default: "{}" }),
    tslib_1.__metadata("design:type", Array)
], Roles.prototype, "accountPermission", void 0);
Roles = tslib_1.__decorate([
    (0, src_1.Entity)("Roles")
], Roles);
exports.Roles = Roles;
//# sourceMappingURL=Roles.js.map