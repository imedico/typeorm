"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../../../src/decorator/Index");
class Information {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Information.prototype, "description", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)("post_likes"),
    tslib_1.__metadata("design:type", Number)
], Information.prototype, "likes", void 0);
exports.Information = Information;
//# sourceMappingURL=Information.js.map