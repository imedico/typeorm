"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Information_1 = require("./Information");
const src_1 = require("../../../../../../src");
class Counters {
    beforeInsert() {
        this.likes = 100;
    }
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information),
    tslib_1.__metadata("design:type", Information_1.Information)
], Counters.prototype, "information", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Counters.prototype, "beforeInsert", null);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map