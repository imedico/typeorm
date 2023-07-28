"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Content = class Content {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Content.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Content.prototype, "title", void 0);
Content = tslib_1.__decorate([
    (0, src_1.Entity)("content"),
    (0, src_1.TableInheritance)({ column: { type: "varchar", name: "type" } })
], Content);
exports.Content = Content;
//# sourceMappingURL=Content.js.map