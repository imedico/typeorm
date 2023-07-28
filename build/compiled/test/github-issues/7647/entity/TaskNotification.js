"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNotification = exports.TaskNotificationType = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var TaskNotificationType;
(function (TaskNotificationType) {
    TaskNotificationType[TaskNotificationType["ASSIGNED"] = 0] = "ASSIGNED";
})(TaskNotificationType = exports.TaskNotificationType || (exports.TaskNotificationType = {}));
let TaskNotification = class TaskNotification {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], TaskNotification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: TaskNotificationType,
        enumName: "TaskNotificationType",
        default: TaskNotificationType.ASSIGNED,
    }),
    tslib_1.__metadata("design:type", Number)
], TaskNotification.prototype, "type", void 0);
TaskNotification = tslib_1.__decorate([
    (0, src_1.Entity)("taskNotifications")
], TaskNotification);
exports.TaskNotification = TaskNotification;
//# sourceMappingURL=TaskNotification.js.map