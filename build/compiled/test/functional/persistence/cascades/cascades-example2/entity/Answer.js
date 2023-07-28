"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const Photo_1 = require("./Photo");
const User_1 = require("./User");
const Question_1 = require("./Question");
let Answer = class Answer {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Answer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Question_1.Question, (question) => question.answers, {
        cascade: ["insert"],
        nullable: false,
    }),
    tslib_1.__metadata("design:type", Question_1.Question)
], Answer.prototype, "question", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Photo_1.Photo, {
        cascade: ["insert"],
        nullable: false,
    }),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], Answer.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => User_1.User, {
        cascade: ["insert"],
        nullable: false,
    }),
    tslib_1.__metadata("design:type", User_1.User)
], Answer.prototype, "user", void 0);
Answer = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map