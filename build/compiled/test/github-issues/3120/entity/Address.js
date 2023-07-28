"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Person_1 = require("./Person");
let Address = class Address {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "country", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "street", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Person_1.Person, (person) => person.addresses),
    tslib_1.__metadata("design:type", Array)
], Address.prototype, "people", void 0);
Address = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Address);
exports.Address = Address;
//# sourceMappingURL=Address.js.map