"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Employee_1 = tslib_1.__importDefault(require("./Employee"));
let Company = class Company extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("varchar", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.VirtualColumn)({
        query: (alias) => `SELECT COUNT("name") FROM "employees" WHERE "companyName" = ${alias}.name`,
    }),
    tslib_1.__metadata("design:type", Number)
], Company.prototype, "totalEmployeesCount", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Employee_1.default, (employee) => employee.company),
    tslib_1.__metadata("design:type", Array)
], Company.prototype, "employees", void 0);
Company = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "companies" })
], Company);
exports.default = Company;
//# sourceMappingURL=Company.js.map