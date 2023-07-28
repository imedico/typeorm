"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Test = class Test {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "datetime", nullable: true, default: null }),
    tslib_1.__metadata("design:type", Date)
], Test.prototype, "publish_date", void 0);
Test = tslib_1.__decorate([
    (0, src_1.Entity)("test")
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map