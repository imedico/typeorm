"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
let Document = class Document {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)("text"),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "docId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "label", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "context", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "jsonb" }),
    tslib_1.__metadata("design:type", Array)
], Document.prototype, "distributions", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "timestamp with time zone" }),
    tslib_1.__metadata("design:type", Date)
], Document.prototype, "date", void 0);
Document = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Document);
exports.Document = Document;
//# sourceMappingURL=Document.js.map