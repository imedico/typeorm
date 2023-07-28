"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
let ExampleEntity = class ExampleEntity {
};
tslib_1.__decorate([
    (0, src_1.Generated)("increment"),
    (0, src_2.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ExampleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_3.Column)({ type: "nvarchar", length: "max" }),
    tslib_1.__metadata("design:type", String)
], ExampleEntity.prototype, "value", void 0);
ExampleEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], ExampleEntity);
exports.ExampleEntity = ExampleEntity;
//# sourceMappingURL=ExampleEntity.js.map