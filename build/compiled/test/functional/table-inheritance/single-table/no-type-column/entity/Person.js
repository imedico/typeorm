"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const TypeOrm = tslib_1.__importStar(require("../../../../../../src"));
const Note_1 = require("./Note");
let Person = class Person {
};
tslib_1.__decorate([
    TypeOrm.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    TypeOrm.Column(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "name", void 0);
tslib_1.__decorate([
    TypeOrm.OneToMany(() => Note_1.Note, (note) => note.owner),
    tslib_1.__metadata("design:type", Array)
], Person.prototype, "notes", void 0);
Person = tslib_1.__decorate([
    TypeOrm.Entity({ name: "person" })
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map