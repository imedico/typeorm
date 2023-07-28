"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Activity_1 = tslib_1.__importDefault(require("./Activity"));
const Employee_1 = tslib_1.__importDefault(require("./Employee"));
let TimeSheet = class TimeSheet extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TimeSheet.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.VirtualColumn)({
        query: (alias) => `SELECT SUM("hours") FROM "activities" WHERE "timesheetId" = ${alias}.id`,
    }),
    tslib_1.__metadata("design:type", Number)
], TimeSheet.prototype, "totalActvityHours", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Activity_1.default, (activity) => activity.timesheet),
    tslib_1.__metadata("design:type", Array)
], TimeSheet.prototype, "activities", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Employee_1.default, (employee) => employee.timesheets),
    tslib_1.__metadata("design:type", Employee_1.default)
], TimeSheet.prototype, "employee", void 0);
TimeSheet = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "timesheets" })
], TimeSheet);
exports.default = TimeSheet;
//# sourceMappingURL=TimeSheet.js.map