"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Counters_1 = require("./Counters");
let Question = class Question {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Question.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)((type) => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Question.prototype, "counters", void 0);
Question = tslib_1.__decorate([
    (0, index_1.Entity)("sample26_question")
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map