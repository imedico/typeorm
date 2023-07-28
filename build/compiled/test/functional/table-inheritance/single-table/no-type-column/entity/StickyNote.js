"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickyNote = void 0;
const tslib_1 = require("tslib");
const TypeOrm = tslib_1.__importStar(require("../../../../../../src"));
const Note_1 = require("./Note");
const Author_1 = require("./Author");
let StickyNote = class StickyNote extends Note_1.Note {
};
tslib_1.__decorate([
    TypeOrm.Column(),
    tslib_1.__metadata("design:type", String)
], StickyNote.prototype, "stickyNoteLabel", void 0);
tslib_1.__decorate([
    TypeOrm.ManyToOne(() => Author_1.Author, (author) => author.notes),
    tslib_1.__metadata("design:type", Author_1.Author)
], StickyNote.prototype, "owner", void 0);
StickyNote = tslib_1.__decorate([
    TypeOrm.ChildEntity()
], StickyNote);
exports.StickyNote = StickyNote;
//# sourceMappingURL=StickyNote.js.map