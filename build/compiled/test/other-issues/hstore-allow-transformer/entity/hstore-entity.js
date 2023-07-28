"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyHSTOREEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const test_transformer_1 = require("../test-transformer");
let DummyHSTOREEntity = class DummyHSTOREEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DummyHSTOREEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "hstore", transformer: test_transformer_1.testTransformer }),
    tslib_1.__metadata("design:type", Object)
], DummyHSTOREEntity.prototype, "translation", void 0);
DummyHSTOREEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], DummyHSTOREEntity);
exports.DummyHSTOREEntity = DummyHSTOREEntity;
//# sourceMappingURL=hstore-entity.js.map