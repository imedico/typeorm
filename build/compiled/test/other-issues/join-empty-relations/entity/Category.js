"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Author_1 = require("./Author");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Author_1.Author),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "authors", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map