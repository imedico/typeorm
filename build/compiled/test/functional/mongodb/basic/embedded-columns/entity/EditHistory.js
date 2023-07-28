"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditHistory = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
class EditHistory {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EditHistory.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EditHistory.prototype, "text", void 0);
exports.EditHistory = EditHistory;
//# sourceMappingURL=EditHistory.js.map