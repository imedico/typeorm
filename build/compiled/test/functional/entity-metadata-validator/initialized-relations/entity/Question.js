"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../src/decorator/relations/ManyToMany");
const Category_1 = require("./Category");
const JoinTable_1 = require("../../../../../src/decorator/relations/JoinTable");
let Question = class Question {
    constructor() {
        this.categories = [];
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Question.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "title", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, { persistence: false }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Question.prototype, "categories", void 0);
Question = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map