"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
var Test;
(function (Test) {
    Test["TEST1"] = "testing (brackets)";
    Test["TEST2"] = "testing (brackers too)";
})(Test || (Test = {}));
let SomeEntity = class SomeEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SomeEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Test }),
    tslib_1.__metadata("design:type", String)
], SomeEntity.prototype, "test", void 0);
SomeEntity = tslib_1.__decorate([
    (0, src_2.Entity)()
], SomeEntity);
exports.SomeEntity = SomeEntity;
//# sourceMappingURL=SomeEntity.js.map