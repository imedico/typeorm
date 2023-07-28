"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity1 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TestEntity2_1 = require("./TestEntity2");
let TestEntity1 = class TestEntity1 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity1.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity1.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((t) => TestEntity2_1.TestEntity2, (a) => a.Entity1),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", TestEntity2_1.TestEntity2)
], TestEntity1.prototype, "Entity2", void 0);
TestEntity1 = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity1);
exports.TestEntity1 = TestEntity1;
//# sourceMappingURL=TestEntity1.js.map