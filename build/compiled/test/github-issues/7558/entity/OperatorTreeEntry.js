"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorTreeEntry = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let OperatorTreeEntry = class OperatorTreeEntry {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], OperatorTreeEntry.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", Function)
], OperatorTreeEntry.prototype, "parent", void 0);
OperatorTreeEntry = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ pattern: "STI", column: { type: "varchar" } }),
    (0, src_1.Tree)("closure-table")
], OperatorTreeEntry);
exports.OperatorTreeEntry = OperatorTreeEntry;
//# sourceMappingURL=OperatorTreeEntry.js.map