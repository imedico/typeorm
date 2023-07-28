"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NnaryOperator = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const OperatorTreeEntry_1 = require("./OperatorTreeEntry");
let NnaryOperator = class NnaryOperator extends OperatorTreeEntry_1.OperatorTreeEntry {
};
tslib_1.__decorate([
    (0, src_1.TreeChildren)({ cascade: true }),
    tslib_1.__metadata("design:type", Array)
], NnaryOperator.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NnaryOperator.prototype, "operator", void 0);
NnaryOperator = tslib_1.__decorate([
    (0, src_1.ChildEntity)("nnary")
], NnaryOperator);
exports.NnaryOperator = NnaryOperator;
//# sourceMappingURL=NnaryOperator.js.map