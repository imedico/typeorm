"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
let ExampleEntity = class ExampleEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ExampleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "varchar",
        length: 3,
        unique: true,
        default: () => "('AA'|| COALESCE(NULL, '1'))",
    }),
    tslib_1.__metadata("design:type", String)
], ExampleEntity.prototype, "someValue", void 0);
ExampleEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ExampleEntity);
exports.ExampleEntity = ExampleEntity;
//# sourceMappingURL=ExampleEntity.js.map