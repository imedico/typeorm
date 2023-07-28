"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complex = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Complex = class Complex {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Complex.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Complex.prototype, "code", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Complex.prototype, "x", void 0);
Complex = tslib_1.__decorate([
    (0, src_1.Entity)()
], Complex);
exports.Complex = Complex;
//# sourceMappingURL=Complex.js.map