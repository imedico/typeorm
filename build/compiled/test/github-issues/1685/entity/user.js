"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const user_month_1 = require("./user-month");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => user_month_1.UserMonth, (userMonth) => userMonth.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "userMonths", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.js.map