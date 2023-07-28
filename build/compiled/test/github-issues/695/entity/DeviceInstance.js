"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInstance = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Device_1 = require("./Device");
let DeviceInstance = class DeviceInstance {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({ name: "id", type: "char", length: "36" }),
    tslib_1.__metadata("design:type", String)
], DeviceInstance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Device_1.Device, { nullable: false }),
    (0, JoinColumn_1.JoinColumn)({ name: "device_id", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", Device_1.Device)
], DeviceInstance.prototype, "device", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "instance", type: "smallint" }),
    tslib_1.__metadata("design:type", Number)
], DeviceInstance.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "type", type: "varchar", length: "30" }),
    tslib_1.__metadata("design:type", String)
], DeviceInstance.prototype, "type", void 0);
DeviceInstance = tslib_1.__decorate([
    (0, Entity_1.Entity)("device_instances")
], DeviceInstance);
exports.DeviceInstance = DeviceInstance;
//# sourceMappingURL=DeviceInstance.js.map