"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Party_1 = require("./Party");
let Person = class Person {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Party_1.Party, { cascade: true, onDelete: "CASCADE" }),
    (0, src_1.JoinColumn)({ name: "id" }),
    tslib_1.__metadata("design:type", Party_1.Party)
], Person.prototype, "party", void 0);
Person = tslib_1.__decorate([
    (0, src_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map