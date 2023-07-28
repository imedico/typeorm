"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
class Duration {
}
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "duration_minutes" }),
    tslib_1.__metadata("design:type", Number)
], Duration.prototype, "durationMinutes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "duration_hours" }),
    tslib_1.__metadata("design:type", Number)
], Duration.prototype, "durationHours", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "duration_days" }),
    tslib_1.__metadata("design:type", Number)
], Duration.prototype, "durationDays", void 0);
exports.Duration = Duration;
//# sourceMappingURL=Duration.js.map