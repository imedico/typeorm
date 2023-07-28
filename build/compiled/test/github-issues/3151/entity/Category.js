"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
const src_4 = require("../../../../src");
const Note_1 = require("./Note");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_2.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_4.ManyToMany)((type) => Note_1.Note, (note) => note.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "notes", void 0);
Category = tslib_1.__decorate([
    (0, src_3.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map