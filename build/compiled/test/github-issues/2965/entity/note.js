"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src/");
const person_1 = require("./person");
let Note = class Note {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Note.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Note.prototype, "label", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => person_1.Person, (person) => person.notes, { lazy: true }),
    tslib_1.__metadata("design:type", Object)
], Note.prototype, "owner", void 0);
Note = tslib_1.__decorate([
    (0, src_1.Entity)()
], Note);
exports.Note = Note;
//# sourceMappingURL=note.js.map