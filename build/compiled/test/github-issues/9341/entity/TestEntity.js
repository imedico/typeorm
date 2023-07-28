"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "bigint", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "big_int", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "numeric", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "big_decimal", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map