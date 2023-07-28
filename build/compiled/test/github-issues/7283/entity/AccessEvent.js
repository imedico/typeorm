"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessEvent = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Employee_1 = require("./Employee");
let AccessEvent = class AccessEvent extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "varchar", length: 128 }),
    tslib_1.__metadata("design:type", String)
], AccessEvent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Employee_1.Employee, (employee) => employee.accessEvents),
    tslib_1.__metadata("design:type", Employee_1.Employee)
], AccessEvent.prototype, "employee", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Employee_1.Employee),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], AccessEvent.prototype, "employees", void 0);
AccessEvent = tslib_1.__decorate([
    (0, src_1.Entity)()
], AccessEvent);
exports.AccessEvent = AccessEvent;
//# sourceMappingURL=AccessEvent.js.map