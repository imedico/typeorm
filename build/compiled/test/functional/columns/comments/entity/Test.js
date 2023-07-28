"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Test = class Test {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello World" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "a", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello\nWorld" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "b", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello World! It's going to be a beautiful day." }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "c", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello World! #@!$`" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "d", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello World. \r\n\t\b\f\v\0" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "e", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "Hello World.\\" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "f", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: " " }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "g", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ comment: "" }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "h", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "i", void 0);
Test = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map