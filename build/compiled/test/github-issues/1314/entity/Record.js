"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
/**
 * For testing Postgres jsonb
 */
let Record = class Record {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Record.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "json", nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "config", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "jsonb", nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "data", void 0);
Record = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Record);
exports.Record = Record;
//# sourceMappingURL=Record.js.map