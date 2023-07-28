"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestChild = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let TestChild = class TestChild {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestChild.prototype, "value", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], TestChild.prototype, "uuid", void 0);
TestChild = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestChild);
exports.TestChild = TestChild;
//# sourceMappingURL=TestChild.js.map