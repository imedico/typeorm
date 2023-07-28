"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModule = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Unit_1 = require("./Unit");
class ContentModule extends Unit_1.Unit {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ContentModule.prototype, "tag", void 0);
exports.ContentModule = ContentModule;
//# sourceMappingURL=ContentModule.js.map