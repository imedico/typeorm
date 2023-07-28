"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Index_1 = require("../../../../../src/decorator/Index");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let Customer = class Customer {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "nameHebrew", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "nameEnglish", void 0);
Customer = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("index_name_english", ["nameEnglish"], { unique: true })
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map