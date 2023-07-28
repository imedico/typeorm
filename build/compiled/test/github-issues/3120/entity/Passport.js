"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Person_1 = require("./Person");
let Passport = class Passport {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Passport.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Passport.prototype, "passportNumber", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Person_1.Person, (person) => person.passport),
    tslib_1.__metadata("design:type", Person_1.Person)
], Passport.prototype, "owner", void 0);
Passport = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Passport);
exports.Passport = Passport;
//# sourceMappingURL=Passport.js.map