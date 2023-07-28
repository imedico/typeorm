"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let Category = class Category {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
Category = tslib_1.__decorate([
    (0, index_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map