"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Record = class Record {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Record.prototype, "id", void 0);
Record = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Record);
exports.Record = Record;
//# sourceMappingURL=Record.js.map