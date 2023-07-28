"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Device = class Device {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({
        name: "id",
        type: "char",
        length: "12",
    }),
    tslib_1.__metadata("design:type", String)
], Device.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        name: "registration_token",
        type: "decimal",
        precision: 6,
        scale: 0,
    }),
    tslib_1.__metadata("design:type", String)
], Device.prototype, "registrationToken", void 0);
Device = tslib_1.__decorate([
    (0, Entity_1.Entity)("devices")
], Device);
exports.Device = Device;
//# sourceMappingURL=Device.js.map