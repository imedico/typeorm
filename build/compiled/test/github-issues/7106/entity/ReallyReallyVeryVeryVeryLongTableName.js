"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReallyReallyVeryVeryVeryLongTableName = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const src_1 = require("../../../../src");
let ReallyReallyVeryVeryVeryLongTableName = class ReallyReallyVeryVeryVeryLongTableName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)() // typeORM requires a pkey
    ,
    tslib_1.__metadata("design:type", Number)
], ReallyReallyVeryVeryVeryLongTableName.prototype, "PrimaryGeneratedColumnIDBlahBlahBlahThisIsReallyLong", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ReallyReallyVeryVeryVeryLongTableName.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Generated)("increment"),
    tslib_1.__metadata("design:type", Number)
], ReallyReallyVeryVeryVeryLongTableName.prototype, "MyNumber", void 0);
ReallyReallyVeryVeryVeryLongTableName = tslib_1.__decorate([
    (0, src_1.Entity)()
], ReallyReallyVeryVeryVeryLongTableName);
exports.ReallyReallyVeryVeryVeryLongTableName = ReallyReallyVeryVeryVeryLongTableName;
//# sourceMappingURL=ReallyReallyVeryVeryVeryLongTableName.js.map