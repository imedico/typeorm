"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
const src_4 = require("../../../../src");
const Contact_1 = require("./Contact");
let Person = class Person extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_3.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_2.Column)((_type) => Contact_1.Contact),
    tslib_1.__metadata("design:type", Contact_1.Contact
    // I added the unique: true just for the sake of the example
    )
], Person.prototype, "contact", void 0);
tslib_1.__decorate([
    (0, src_2.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "status", void 0);
Person = tslib_1.__decorate([
    (0, src_4.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map