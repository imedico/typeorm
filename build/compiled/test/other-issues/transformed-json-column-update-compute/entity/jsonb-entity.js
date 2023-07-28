"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyJSONBEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const src_1 = require("../../../../src");
const test_transformer_1 = require("../test-transformer");
let DummyJSONBEntity = class DummyJSONBEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DummyJSONBEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], DummyJSONBEntity.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "jsonb", transformer: test_transformer_1.testTransformer }),
    tslib_1.__metadata("design:type", Object)
], DummyJSONBEntity.prototype, "value", void 0);
DummyJSONBEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], DummyJSONBEntity);
exports.DummyJSONBEntity = DummyJSONBEntity;
//# sourceMappingURL=jsonb-entity.js.map