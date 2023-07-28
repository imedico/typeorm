"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity2 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TestEntity1_1 = require("./TestEntity1");
const TestEntity3_1 = require("./TestEntity3");
let TestEntity2 = class TestEntity2 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity2.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity2.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((t) => TestEntity1_1.TestEntity1, (a) => a.Entity2),
    tslib_1.__metadata("design:type", TestEntity1_1.TestEntity1)
], TestEntity2.prototype, "Entity1", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((t) => TestEntity3_1.TestEntity3, (a) => a.Entity2),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", TestEntity3_1.TestEntity3)
], TestEntity2.prototype, "Entity3", void 0);
TestEntity2 = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity2);
exports.TestEntity2 = TestEntity2;
//# sourceMappingURL=TestEntity2.js.map