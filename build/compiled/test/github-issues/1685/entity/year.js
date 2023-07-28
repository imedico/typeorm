"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Year = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const month_1 = require("./month");
let Year = class Year {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Year.prototype, "yearNo", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => month_1.Month, (month) => month.yearNo),
    tslib_1.__metadata("design:type", Array)
], Year.prototype, "month", void 0);
Year = tslib_1.__decorate([
    (0, src_1.Entity)()
], Year);
exports.Year = Year;
//# sourceMappingURL=year.js.map