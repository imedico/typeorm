"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCounters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Information_1 = require("./Information");
class SimpleCounters {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SimpleCounters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SimpleCounters.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SimpleCounters.prototype, "favorites", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information, { prefix: "info" }),
    tslib_1.__metadata("design:type", Information_1.Information)
], SimpleCounters.prototype, "information", void 0);
exports.SimpleCounters = SimpleCounters;
//# sourceMappingURL=SimpleCounters.js.map