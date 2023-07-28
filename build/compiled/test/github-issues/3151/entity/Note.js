"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
const src_4 = require("../../../../src");
const src_5 = require("../../../../src");
const Category_1 = require("./Category");
let Note = class Note {
};
tslib_1.__decorate([
    (0, src_2.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Note.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Note.prototype, "content", void 0);
tslib_1.__decorate([
    (0, src_5.ManyToMany)((type) => Category_1.Category, (category) => category.notes),
    (0, src_4.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Note.prototype, "categories", void 0);
Note = tslib_1.__decorate([
    (0, src_3.Entity)()
], Note);
exports.Note = Note;
//# sourceMappingURL=Note.js.map