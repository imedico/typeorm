"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Test = class Test {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "int", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "uInt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "tinyint", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "uTinyInt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "smallint", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "uSmallInt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "mediumint", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "uMediumInt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "bigint", unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "uBigInt", void 0);
Test = tslib_1.__decorate([
    (0, src_1.Entity)()
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map