"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Dummy = class Dummy {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Dummy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Dummy.prototype, "field", void 0);
Dummy = tslib_1.__decorate([
    (0, src_1.Entity)()
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=Dummy.js.map