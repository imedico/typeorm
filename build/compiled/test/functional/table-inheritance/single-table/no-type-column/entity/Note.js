"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const tslib_1 = require("tslib");
const TypeOrm = tslib_1.__importStar(require("../../../../../../src"));
const Person_1 = require("./Person");
let Note = class Note {
};
tslib_1.__decorate([
    TypeOrm.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Note.prototype, "id", void 0);
tslib_1.__decorate([
    TypeOrm.Column({ default: null }),
    tslib_1.__metadata("design:type", String)
], Note.prototype, "label", void 0);
tslib_1.__decorate([
    TypeOrm.ManyToOne(() => Person_1.Person),
    tslib_1.__metadata("design:type", Person_1.Person)
], Note.prototype, "owner", void 0);
Note = tslib_1.__decorate([
    TypeOrm.Entity(),
    TypeOrm.TableInheritance({ column: { type: String, name: "type" } })
], Note);
exports.Note = Note;
//# sourceMappingURL=Note.js.map