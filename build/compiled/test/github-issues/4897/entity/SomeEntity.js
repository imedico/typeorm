"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeEntity = exports.UserRoles = exports.userRoles = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
exports.userRoles = {
    USER: "user",
    ADMIN: "admin",
};
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["ADMIN"] = "admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
let SomeEntity = class SomeEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SomeEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "simple-enum",
        enum: Object.values(exports.userRoles),
        default: exports.userRoles.USER,
    }),
    tslib_1.__metadata("design:type", String)
], SomeEntity.prototype, "test", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "simple-enum",
        enum: UserRoles,
        default: UserRoles.USER,
    }),
    tslib_1.__metadata("design:type", String)
], SomeEntity.prototype, "test2", void 0);
SomeEntity = tslib_1.__decorate([
    (0, src_2.Entity)()
], SomeEntity);
exports.SomeEntity = SomeEntity;
//# sourceMappingURL=SomeEntity.js.map