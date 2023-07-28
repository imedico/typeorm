"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy2 = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../src");
let Dummy2 = class Dummy2 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({
        generated: true,
        nullable: false,
        primary: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Dummy2.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "name" }),
    tslib_1.__metadata("design:type", String)
], Dummy2.prototype, "name", void 0);
Dummy2 = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Dummy2);
exports.Dummy2 = Dummy2;
//# sourceMappingURL=dummy2.js.map