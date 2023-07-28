"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeLog = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Change_1 = require("./Change");
const Log_1 = require("./Log");
let ChangeLog = class ChangeLog extends Log_1.Log {
};
tslib_1.__decorate([
    (0, index_1.OneToMany)(() => Change_1.Change, (change) => change.log, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], ChangeLog.prototype, "changes", void 0);
ChangeLog = tslib_1.__decorate([
    (0, index_1.ChildEntity)()
], ChangeLog);
exports.ChangeLog = ChangeLog;
//# sourceMappingURL=ChangeLog.js.map