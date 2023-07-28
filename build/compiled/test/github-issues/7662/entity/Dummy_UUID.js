"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Dummy = class Dummy {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Dummy.prototype, "id", void 0);
Dummy = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=Dummy_UUID.js.map