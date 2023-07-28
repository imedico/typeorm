"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentModel = exports.EquipmentModelType = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var EquipmentModelType;
(function (EquipmentModelType) {
    EquipmentModelType[EquipmentModelType["Thing1"] = 1] = "Thing1";
    EquipmentModelType[EquipmentModelType["Thing2"] = 4] = "Thing2";
    EquipmentModelType[EquipmentModelType["Thing3"] = 3] = "Thing3";
    EquipmentModelType[EquipmentModelType["Thing4"] = 2] = "Thing4";
})(EquipmentModelType = exports.EquipmentModelType || (exports.EquipmentModelType = {}));
let EquipmentModel = class EquipmentModel {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], EquipmentModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("enum", { enum: EquipmentModelType }),
    tslib_1.__metadata("design:type", Number)
], EquipmentModel.prototype, "type", void 0);
EquipmentModel = tslib_1.__decorate([
    (0, src_1.Entity)("equipmentmodels")
], EquipmentModel);
exports.EquipmentModel = EquipmentModel;
//# sourceMappingURL=EquipmentModel.js.map