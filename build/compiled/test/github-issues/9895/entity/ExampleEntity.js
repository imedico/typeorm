"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
class ExampleBigNumber {
    constructor(value) {
        this.value = value;
    }
    toFixed() {
        return this.value;
    }
}
let ExampleEntity = class ExampleEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ExampleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "numeric",
        nullable: false,
        transformer: {
            from: (value) => {
                return new ExampleBigNumber(value);
            },
            to: (value) => {
                return value.toFixed();
            },
        },
    }),
    tslib_1.__metadata("design:type", ExampleBigNumber)
], ExampleEntity.prototype, "total", void 0);
ExampleEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ExampleEntity);
exports.ExampleEntity = ExampleEntity;
//# sourceMappingURL=ExampleEntity.js.map