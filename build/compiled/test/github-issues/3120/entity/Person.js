"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Address_1 = require("./Address");
const Company_1 = require("./Company");
const Passport_1 = require("./Passport");
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Company_1.Company),
    tslib_1.__metadata("design:type", Company_1.Company)
], Person.prototype, "company", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Address_1.Address, (address) => address.people),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Person.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Passport_1.Passport, (passport) => passport.owner),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Passport_1.Passport)
], Person.prototype, "passport", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map