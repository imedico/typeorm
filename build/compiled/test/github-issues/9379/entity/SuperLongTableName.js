"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperLongTableName = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const SuperLongTableNameIsRelatedToOriginal_1 = require("./SuperLongTableNameIsRelatedToOriginal");
let SuperLongTableName = class SuperLongTableName {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SuperLongTableName.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SuperLongTableName.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => SuperLongTableNameIsRelatedToOriginal_1.SuperLongTableNameWhichIsRelatedToOriginalTable, (table) => table.superLongTableName),
    tslib_1.__metadata("design:type", Array)
], SuperLongTableName.prototype, "relatedToOriginal", void 0);
SuperLongTableName = tslib_1.__decorate([
    (0, src_1.Entity)()
], SuperLongTableName);
exports.SuperLongTableName = SuperLongTableName;
//# sourceMappingURL=SuperLongTableName.js.map