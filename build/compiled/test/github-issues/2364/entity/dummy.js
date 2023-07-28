"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Dummy = class Dummy {
};
tslib_1.__decorate([
    (0, Column_1.Column)({
        generated: true,
        nullable: false,
        primary: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Dummy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "name" }),
    tslib_1.__metadata("design:type", String)
], Dummy.prototype, "name", void 0);
Dummy = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=dummy.js.map