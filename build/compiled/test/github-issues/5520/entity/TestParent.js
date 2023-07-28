"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestParent = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TestChild_1 = require("./TestChild");
let TestParent = class TestParent {
};
tslib_1.__decorate([
    (0, src_1.OneToOne)("TestChild", {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", TestChild_1.TestChild)
], TestParent.prototype, "child", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], TestParent.prototype, "uuid", void 0);
TestParent = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestParent);
exports.TestParent = TestParent;
//# sourceMappingURL=TestParent.js.map