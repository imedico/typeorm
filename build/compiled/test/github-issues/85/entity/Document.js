"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Document = class Document {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true, select: false }),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ insert: false, select: false, nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ insert: false, default: 1 }),
    tslib_1.__metadata("design:type", Number)
], Document.prototype, "version", void 0);
Document = tslib_1.__decorate([
    (0, src_1.Entity)()
], Document);
exports.Document = Document;
//# sourceMappingURL=Document.js.map