"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity4 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TestEntity3_1 = require("./TestEntity3");
let TestEntity4 = class TestEntity4 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity4.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity4.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((t) => TestEntity3_1.TestEntity3, (entity3) => entity3.Entity4),
    tslib_1.__metadata("design:type", TestEntity3_1.TestEntity3)
], TestEntity4.prototype, "Entity3", void 0);
TestEntity4 = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity4);
exports.TestEntity4 = TestEntity4;
//# sourceMappingURL=TestEntity4.js.map