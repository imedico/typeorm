"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const wrapped_string_1 = require("../wrapped-string");
let Dummy = class Dummy {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Dummy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: String, transformer: wrapped_string_1.wrappedStringTransformer }),
    tslib_1.__metadata("design:type", wrapped_string_1.WrappedString)
], Dummy.prototype, "value", void 0);
Dummy = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=Dummy.js.map