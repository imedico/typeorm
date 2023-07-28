"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = exports.CarEngine = void 0;
const tslib_1 = require("tslib");
const Vehicle_1 = require("./Vehicle");
const src_1 = require("../../../../src");
class CarEngine extends Vehicle_1.Engine {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CarEngine.prototype, "horsePower", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CarEngine.prototype, "torque", void 0);
exports.CarEngine = CarEngine;
let Car = class Car extends Vehicle_1.Vehicle {
};
tslib_1.__decorate([
    (0, src_1.Column)((type) => CarEngine, { prefix: "carEngine" }),
    tslib_1.__metadata("design:type", CarEngine)
], Car.prototype, "engine", void 0);
Car = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], Car);
exports.Car = Car;
//# sourceMappingURL=Car.js.map