"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.DEFAULT_VALUE = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
exports.DEFAULT_VALUE = "default-value";
let Test = class Test {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Test.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: exports.DEFAULT_VALUE }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "value", void 0);
Test = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Test);
exports.Test = Test;
//# sourceMappingURL=Test.js.map