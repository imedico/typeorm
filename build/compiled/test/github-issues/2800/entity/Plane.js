"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = exports.PlaneEngine = void 0;
const tslib_1 = require("tslib");
const Vehicle_1 = require("./Vehicle");
const src_1 = require("../../../../src");
class PlaneEngine extends Vehicle_1.Engine {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PlaneEngine.prototype, "beep", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PlaneEngine.prototype, "boop", void 0);
exports.PlaneEngine = PlaneEngine;
let Plane = class Plane extends Vehicle_1.Vehicle {
};
tslib_1.__decorate([
    (0, src_1.Column)((type) => PlaneEngine, { prefix: "planeEngine" }),
    tslib_1.__metadata("design:type", PlaneEngine)
], Plane.prototype, "engine", void 0);
Plane = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], Plane);
exports.Plane = Plane;
//# sourceMappingURL=Plane.js.map