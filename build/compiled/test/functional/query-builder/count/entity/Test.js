"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let Test = class Test {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "varcharField", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "uuidField", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "intField", void 0);
Test = tslib_1.__decorate([
    (0, src_1.Entity)("tests")
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map