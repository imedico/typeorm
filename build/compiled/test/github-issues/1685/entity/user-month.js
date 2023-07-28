"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMonth = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const month_1 = require("./month");
const user_1 = require("./user");
let UserMonth = class UserMonth {
    workaround() {
        // Here a workaround for this issue
        // this.yearNo = this.month.year.yearNo;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserMonth.prototype, "yearNo", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserMonth.prototype, "monthNo", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], UserMonth.prototype, "username", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => month_1.Month, (month) => month.userMonth),
    (0, src_1.JoinColumn)([
        { name: "yearNo", referencedColumnName: "yearNo" },
        { name: "monthNo", referencedColumnName: "monthNo" },
    ]),
    tslib_1.__metadata("design:type", month_1.Month)
], UserMonth.prototype, "month", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => user_1.User, (user) => user.username),
    (0, src_1.JoinColumn)({ name: "username", referencedColumnName: "username" }),
    tslib_1.__metadata("design:type", user_1.User)
], UserMonth.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserMonth.prototype, "workaround", null);
UserMonth = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserMonth);
exports.UserMonth = UserMonth;
//# sourceMappingURL=user-month.js.map