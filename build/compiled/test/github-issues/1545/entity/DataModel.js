"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModel = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const MainModel_1 = require("./MainModel");
const ValidationModel_1 = require("./ValidationModel");
let DataModel = class DataModel {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], DataModel.prototype, "validation", void 0);
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], DataModel.prototype, "mainId", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => ValidationModel_1.ValidationModel, (validation) => validation.dataModel, { eager: true }),
    (0, index_1.JoinColumn)({
        name: "validation",
        referencedColumnName: "validation",
    }),
    tslib_1.__metadata("design:type", ValidationModel_1.ValidationModel)
], DataModel.prototype, "validations", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => MainModel_1.MainModel, (main) => main.dataModel),
    (0, index_1.JoinColumn)({
        name: "mainId",
        referencedColumnName: "id",
    }),
    tslib_1.__metadata("design:type", MainModel_1.MainModel)
], DataModel.prototype, "main", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({
        type: "boolean",
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], DataModel.prototype, "active", void 0);
DataModel = tslib_1.__decorate([
    (0, index_1.Entity)()
], DataModel);
exports.DataModel = DataModel;
//# sourceMappingURL=DataModel.js.map