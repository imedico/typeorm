"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Author_1 = require("./Author");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
let Category = class Category {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Author_1.Author),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Author_1.Author)
], Category.prototype, "author", void 0);
Category = tslib_1.__decorate([
    (0, index_1.Entity)("sample23_category")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map