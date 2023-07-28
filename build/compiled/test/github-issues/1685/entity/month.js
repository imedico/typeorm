"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Month = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const year_1 = require("./year");
const user_month_1 = require("./user-month");
let Month = class Month {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Month.prototype, "yearNo", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Month.prototype, "monthNo", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => year_1.Year, (year) => year.month),
    (0, src_1.JoinColumn)({ name: "yearNo", referencedColumnName: "yearNo" }),
    tslib_1.__metadata("design:type", year_1.Year)
], Month.prototype, "year", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => user_month_1.UserMonth, (userMonth) => userMonth.month),
    tslib_1.__metadata("design:type", Array)
], Month.prototype, "userMonth", void 0);
Month = tslib_1.__decorate([
    (0, src_1.Entity)()
], Month);
exports.Month = Month;
//# sourceMappingURL=month.js.map