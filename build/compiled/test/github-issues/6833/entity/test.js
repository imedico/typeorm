"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONBKeyTest = exports.MyId = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class MyId {
}
exports.MyId = MyId;
let JSONBKeyTest = class JSONBKeyTest {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("jsonb"),
    tslib_1.__metadata("design:type", MyId)
], JSONBKeyTest.prototype, "id", void 0);
JSONBKeyTest = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "jsonb_key_tests" })
], JSONBKeyTest);
exports.JSONBKeyTest = JSONBKeyTest;
//# sourceMappingURL=test.js.map