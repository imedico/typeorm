"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Example = class Example {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Date)
], Example.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Example.prototype, "text", void 0);
Example = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Example);
exports.Example = Example;
//# sourceMappingURL=Example.js.map