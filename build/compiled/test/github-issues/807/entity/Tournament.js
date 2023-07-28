"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Tournament = class Tournament {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ unique: true, length: 200 }),
    tslib_1.__metadata("design:type", String)
], Tournament.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Tournament.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Tournament.prototype, "endDate", void 0);
Tournament = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Tournament);
exports.Tournament = Tournament;
//# sourceMappingURL=Tournament.js.map