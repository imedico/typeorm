"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Question_1 = require("./Question");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Question_1.Question, {
        cascade: ["insert"],
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Question_1.Question)
], User.prototype, "question", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map