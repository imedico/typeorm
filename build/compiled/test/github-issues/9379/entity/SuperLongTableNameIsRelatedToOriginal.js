"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperLongTableNameWhichIsRelatedToOriginalTable = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const SuperLongTableName_1 = require("./SuperLongTableName");
let SuperLongTableNameWhichIsRelatedToOriginalTable = class SuperLongTableNameWhichIsRelatedToOriginalTable {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SuperLongTableNameWhichIsRelatedToOriginalTable.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SuperLongTableNameWhichIsRelatedToOriginalTable.prototype, "superLongTableNameId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => SuperLongTableName_1.SuperLongTableName, (table) => table.relatedToOriginal),
    (0, src_1.JoinColumn)({ name: "superLongTableNameId" }),
    tslib_1.__metadata("design:type", SuperLongTableName_1.SuperLongTableName)
], SuperLongTableNameWhichIsRelatedToOriginalTable.prototype, "superLongTableName", void 0);
SuperLongTableNameWhichIsRelatedToOriginalTable = tslib_1.__decorate([
    (0, src_1.Entity)()
], SuperLongTableNameWhichIsRelatedToOriginalTable);
exports.SuperLongTableNameWhichIsRelatedToOriginalTable = SuperLongTableNameWhichIsRelatedToOriginalTable;
//# sourceMappingURL=SuperLongTableNameIsRelatedToOriginal.js.map