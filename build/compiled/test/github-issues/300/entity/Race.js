"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Duration_1 = require("./Duration");
let Race = class Race {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Race.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Race.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Duration_1.Duration),
    tslib_1.__metadata("design:type", Duration_1.Duration)
], Race.prototype, "duration", void 0);
Race = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Race);
exports.Race = Race;
//# sourceMappingURL=Race.js.map