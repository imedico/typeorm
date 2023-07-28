"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationModel = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const DataModel_1 = require("./DataModel");
let ValidationModel = class ValidationModel {
};
tslib_1.__decorate([
    (0, index_1.Column)({
        type: "integer",
        primary: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ValidationModel.prototype, "validation", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => DataModel_1.DataModel, (dataModel) => dataModel.validations),
    tslib_1.__metadata("design:type", Array)
], ValidationModel.prototype, "dataModel", void 0);
ValidationModel = tslib_1.__decorate([
    (0, index_1.Entity)()
], ValidationModel);
exports.ValidationModel = ValidationModel;
//# sourceMappingURL=ValidationModel.js.map