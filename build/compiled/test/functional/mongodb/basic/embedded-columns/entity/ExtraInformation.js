"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraInformation = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const EditHistory_1 = require("./EditHistory");
class ExtraInformation {
}
tslib_1.__decorate([
    (0, Column_1.Column)((type) => EditHistory_1.EditHistory),
    tslib_1.__metadata("design:type", EditHistory_1.EditHistory)
], ExtraInformation.prototype, "lastEdit", void 0);
exports.ExtraInformation = ExtraInformation;
//# sourceMappingURL=ExtraInformation.js.map