"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "id1", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "id2", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "name", void 0);
TestEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)("test_entity")
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map