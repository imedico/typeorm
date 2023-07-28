"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Answer = class Answer {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Answer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Answer.prototype, "text", void 0);
Answer = tslib_1.__decorate([
    (0, Entity_1.Entity)({ database: "filename-sqlite.attach.db" })
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map