"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Men = void 0;
const tslib_1 = require("tslib");
const Person_1 = require("./Person");
const src_1 = require("../../../../src");
let Men = class Men extends Person_1.Person {
};
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Men.prototype, "beardColor", void 0);
Men = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], Men);
exports.Men = Men;
//# sourceMappingURL=Men.js.map