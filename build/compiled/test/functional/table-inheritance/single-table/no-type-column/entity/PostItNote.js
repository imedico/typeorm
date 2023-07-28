"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostItNote = void 0;
const tslib_1 = require("tslib");
const TypeOrm = tslib_1.__importStar(require("../../../../../../src"));
const Note_1 = require("./Note");
const Employee_1 = require("./Employee");
let PostItNote = class PostItNote extends Note_1.Note {
};
tslib_1.__decorate([
    TypeOrm.Column(),
    tslib_1.__metadata("design:type", String)
], PostItNote.prototype, "postItNoteLabel", void 0);
tslib_1.__decorate([
    TypeOrm.ManyToOne(() => Employee_1.Employee, (person) => person.notes),
    tslib_1.__metadata("design:type", Employee_1.Employee)
], PostItNote.prototype, "owner", void 0);
PostItNote = tslib_1.__decorate([
    TypeOrm.ChildEntity()
], PostItNote);
exports.PostItNote = PostItNote;
//# sourceMappingURL=PostItNote.js.map