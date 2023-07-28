"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.Engine = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class Engine {
}
exports.Engine = Engine;
let Vehicle = class Vehicle {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
Vehicle = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { name: "type", type: String } })
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=Vehicle.js.map