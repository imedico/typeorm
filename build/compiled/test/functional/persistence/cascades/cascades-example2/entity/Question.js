"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Answer_1 = require("./Answer");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
let Question = class Question {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Question.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "My question" }),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Answer_1.Answer, (answer) => answer.question, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Array)
], Question.prototype, "answers", void 0);
Question = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map