"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
const src_4 = require("../../../../src");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_3.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_2.Column)({ type: "varchar", length: 100, nullable: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "unique_column", void 0);
tslib_1.__decorate([
    (0, src_2.Column)({ type: "varchar", length: 100, nullable: true, unique: false }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "nonunique_column", void 0);
tslib_1.__decorate([
    (0, src_4.CreateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "from", void 0);
tslib_1.__decorate([
    (0, src_4.CreateDateColumn)({
        precision: 3,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "from2", void 0);
tslib_1.__decorate([
    (0, src_4.CreateDateColumn)({
        precision: null,
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "from3", void 0);
tslib_1.__decorate([
    (0, src_2.Column)({
        precision: null,
        type: "timestamp",
        default: null,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "to", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map