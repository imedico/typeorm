"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Unique_1 = require("../../../../src/decorator/Unique");
let Company = class Company {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Company.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "name", void 0);
Company = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Unique_1.Unique)(["name"], { deferrable: "INITIALLY DEFERRED" })
], Company);
exports.Company = Company;
//# sourceMappingURL=Company.js.map