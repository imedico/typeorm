"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Information_1 = require("./Information");
class Counters {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "favorites", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information, { prefix: "info" }),
    tslib_1.__metadata("design:type", Information_1.Information)
], Counters.prototype, "information", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information, { prefix: "testData" }),
    tslib_1.__metadata("design:type", Information_1.Information)
], Counters.prototype, "data", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information, { prefix: "" }),
    tslib_1.__metadata("design:type", Information_1.Information)
], Counters.prototype, "dataWithoutPrefix", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map