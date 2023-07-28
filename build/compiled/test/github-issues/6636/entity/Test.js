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
    (0, src_1.Column)({ nullable: true, precision: 6 }),
    tslib_1.__metadata("design:type", Date)
], Test.prototype, "startedAt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "decimal", precision: 5, scale: 2 }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "value", void 0);
Test = tslib_1.__decorate([
    (0, src_1.Entity)()
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map