"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const User_1 = require("./User");
const src_1 = require("../../../../../../src");
let Person = class Person {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Person.prototype, "user", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map