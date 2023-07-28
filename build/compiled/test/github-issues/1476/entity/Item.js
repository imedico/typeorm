"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let Item = class Item {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "planId", void 0);
Item = tslib_1.__decorate([
    (0, index_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map