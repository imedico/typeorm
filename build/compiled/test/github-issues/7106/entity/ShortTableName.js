"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTableName = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const src_1 = require("../../../../src");
let ShortTableName = class ShortTableName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)() // typeORM requires a pkey
    ,
    tslib_1.__metadata("design:type", Number)
], ShortTableName.prototype, "PrimaryGeneratedColumnIDBlahBlahBlahThisIsReallyLong", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ShortTableName.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ShortTableName.prototype, "Value", void 0);
ShortTableName = tslib_1.__decorate([
    (0, src_1.Entity)()
], ShortTableName);
exports.ShortTableName = ShortTableName;
//# sourceMappingURL=ShortTableName.js.map