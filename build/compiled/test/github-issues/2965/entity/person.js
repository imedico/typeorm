"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src/");
const note_1 = require("./note");
let Person = class Person {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => note_1.Note, (note) => note.owner, { lazy: true }),
    tslib_1.__metadata("design:type", Object)
], Person.prototype, "notes", void 0);
Person = tslib_1.__decorate([
    (0, src_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=person.js.map