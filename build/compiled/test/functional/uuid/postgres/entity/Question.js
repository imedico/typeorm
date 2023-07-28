"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Generated_1 = require("../../../../../src/decorator/Generated");
let Question = class Question {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Generated_1.Generated)("uuid"),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("uuid"),
    tslib_1.__metadata("design:type", String)
], Question.prototype, "uuid2", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("uuid", { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Question.prototype, "uuid3", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    (0, Generated_1.Generated)("uuid"),
    tslib_1.__metadata("design:type", Object)
], Question.prototype, "uuid4", void 0);
Question = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map