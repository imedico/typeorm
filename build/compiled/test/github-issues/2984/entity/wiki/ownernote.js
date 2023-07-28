"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerNote = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const note_1 = require("./note");
let OwnerNote = class OwnerNote extends note_1.Note {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], OwnerNote.prototype, "owner", void 0);
OwnerNote = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], OwnerNote);
exports.OwnerNote = OwnerNote;
//# sourceMappingURL=ownernote.js.map