"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
class Duration {
}
tslib_1.__decorate([
    (0, Column_1.Column)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Duration.prototype, "minutes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Duration.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: Number, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Duration.prototype, "days", void 0);
exports.Duration = Duration;
//# sourceMappingURL=Duration.js.map