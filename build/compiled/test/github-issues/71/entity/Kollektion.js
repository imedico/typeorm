"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kollektion = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Generated_1 = require("../../../../src/decorator/Generated");
let Kollektion = class Kollektion {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({ name: "kollektion_id" }),
    (0, Generated_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], Kollektion.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "kollektion_name" }),
    tslib_1.__metadata("design:type", String)
], Kollektion.prototype, "name", void 0);
Kollektion = tslib_1.__decorate([
    (0, Entity_1.Entity)("kollektion")
], Kollektion);
exports.Kollektion = Kollektion;
//# sourceMappingURL=Kollektion.js.map