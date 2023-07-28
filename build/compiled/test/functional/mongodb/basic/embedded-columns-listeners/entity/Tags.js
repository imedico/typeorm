"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const src_1 = require("../../../../../../src");
class Tags {
    beforeInsert() {
        this.used = 100;
    }
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Tags.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Tags.prototype, "used", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Tags.prototype, "beforeInsert", null);
exports.Tags = Tags;
//# sourceMappingURL=Tags.js.map