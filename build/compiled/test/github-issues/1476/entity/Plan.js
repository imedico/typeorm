"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let Plan = class Plan {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Plan.prototype, "planId", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Plan.prototype, "planName", void 0);
Plan = tslib_1.__decorate([
    (0, index_1.Entity)()
], Plan);
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map