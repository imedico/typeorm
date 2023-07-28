"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_2.Column)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "myField", void 0);
Category = tslib_1.__decorate([
    (0, src_3.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map