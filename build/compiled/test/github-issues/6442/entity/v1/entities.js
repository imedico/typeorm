"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarEntity = exports.FooEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let FooEntity = class FooEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "int", width: 10, unsigned: true, nullable: false }),
    (0, src_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], FooEntity.prototype, "id", void 0);
FooEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], FooEntity);
exports.FooEntity = FooEntity;
let BarEntity = class BarEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "int", width: 10, unsigned: true }),
    (0, src_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], BarEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar", { nullable: false, length: 50 }),
    tslib_1.__metadata("design:type", String)
], BarEntity.prototype, "code", void 0);
BarEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], BarEntity);
exports.BarEntity = BarEntity;
//# sourceMappingURL=entities.js.map