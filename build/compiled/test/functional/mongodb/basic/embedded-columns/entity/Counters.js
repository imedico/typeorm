"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Information_1 = require("./Information");
const ExtraInformation_1 = require("./ExtraInformation");
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
    (0, Column_1.Column)((type) => Information_1.Information),
    tslib_1.__metadata("design:type", Information_1.Information)
], Counters.prototype, "information", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => ExtraInformation_1.ExtraInformation),
    tslib_1.__metadata("design:type", ExtraInformation_1.ExtraInformation)
], Counters.prototype, "extraInformation", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map