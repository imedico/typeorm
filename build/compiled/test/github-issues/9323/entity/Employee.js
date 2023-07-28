"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TimeSheet_1 = tslib_1.__importDefault(require("./TimeSheet"));
const Company_1 = tslib_1.__importDefault(require("./Company"));
let Employee = class Employee extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("varchar", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Company_1.default, (company) => company.employees),
    tslib_1.__metadata("design:type", Company_1.default)
], Employee.prototype, "company", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => TimeSheet_1.default, (timesheet) => timesheet.employee),
    tslib_1.__metadata("design:type", Array)
], Employee.prototype, "timesheets", void 0);
Employee = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "employees" })
], Employee);
exports.default = Employee;
//# sourceMappingURL=Employee.js.map