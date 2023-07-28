"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Test = class Test {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "int" }),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        generatedType: "STORED",
        // asExpression is needed here or generatedType above will be ignored
        asExpression: "concat(`firstName`,' ',`lastName`)",
    }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "name", void 0);
Test = tslib_1.__decorate([
    (0, src_1.Entity)()
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map