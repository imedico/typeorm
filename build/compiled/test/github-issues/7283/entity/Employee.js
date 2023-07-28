"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const AccessEvent_1 = require("./AccessEvent");
var Providers;
(function (Providers) {
    Providers["MS_GRAPH"] = "msGraph";
    Providers["ATLASSIAN"] = "atlassian";
})(Providers || (Providers = {}));
let Employee = class Employee extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "enum", enum: Providers, enumName: "providerEnum" }),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => AccessEvent_1.AccessEvent, (accessEvent) => accessEvent.employee),
    tslib_1.__metadata("design:type", Array)
], Employee.prototype, "accessEvents", void 0);
Employee = tslib_1.__decorate([
    (0, src_1.Entity)()
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map