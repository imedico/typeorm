"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberEntry = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const OperatorTreeEntry_1 = require("./OperatorTreeEntry");
let NumberEntry = class NumberEntry extends OperatorTreeEntry_1.OperatorTreeEntry {
};
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "float",
    }),
    tslib_1.__metadata("design:type", Number)
], NumberEntry.prototype, "value", void 0);
NumberEntry = tslib_1.__decorate([
    (0, src_1.ChildEntity)("number")
], NumberEntry);
exports.NumberEntry = NumberEntry;
//# sourceMappingURL=NumberEntry.js.map