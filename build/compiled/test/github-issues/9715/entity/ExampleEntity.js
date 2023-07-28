"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleEntity = exports.ExampleEnum = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var ExampleEnum;
(function (ExampleEnum) {
    ExampleEnum["EnumValue1"] = "enumvalue1";
    ExampleEnum["EnumValue2"] = "enumvalue2";
    ExampleEnum["EnumValue3"] = "enumvalue3";
    ExampleEnum["EnumValue4"] = "enumvalue4";
})(ExampleEnum = exports.ExampleEnum || (exports.ExampleEnum = {}));
let ExampleEntity = class ExampleEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ExampleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "simple-enum",
        enum: ExampleEnum,
    }),
    tslib_1.__metadata("design:type", String)
], ExampleEntity.prototype, "enumcolumn", void 0);
ExampleEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ExampleEntity);
exports.ExampleEntity = ExampleEntity;
//# sourceMappingURL=ExampleEntity.js.map