"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TimeSheet_1 = tslib_1.__importDefault(require("./TimeSheet"));
let Activity = class Activity extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Activity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], Activity.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => TimeSheet_1.default, (timesheet) => timesheet.activities),
    tslib_1.__metadata("design:type", TimeSheet_1.default)
], Activity.prototype, "timesheet", void 0);
Activity = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "activities" })
], Activity);
exports.default = Activity;
//# sourceMappingURL=Activity.js.map