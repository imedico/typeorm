"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity3 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TestEntity2_1 = require("./TestEntity2");
const TestEntity4_1 = require("./TestEntity4");
let TestEntity3 = class TestEntity3 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity3.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((t) => TestEntity2_1.TestEntity2, (a) => a.Entity3),
    tslib_1.__metadata("design:type", TestEntity2_1.TestEntity2)
], TestEntity3.prototype, "Entity2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity3.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((t) => TestEntity4_1.TestEntity4, (entity4) => entity4.Entity3),
    tslib_1.__metadata("design:type", Array)
], TestEntity3.prototype, "Entity4", void 0);
TestEntity3 = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity3);
exports.TestEntity3 = TestEntity3;
//# sourceMappingURL=TestEntity3.js.map