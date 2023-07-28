"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const src_1 = require("../../../../../../src");
class Information {
    beforeInsert() {
        this.description = "description afterLoad";
    }
    afterLoad() {
        this.comments = 1;
    }
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Information.prototype, "description", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Information.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Information.prototype, "beforeInsert", null);
tslib_1.__decorate([
    (0, src_1.AfterLoad)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Information.prototype, "afterLoad", null);
exports.Information = Information;
//# sourceMappingURL=Information.js.map