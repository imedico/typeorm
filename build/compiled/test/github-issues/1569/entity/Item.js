"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.EmbeddedItem = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
class EmbeddedItem {
}
tslib_1.__decorate([
    (0, index_1.Column)({ type: "integer", array: true }),
    tslib_1.__metadata("design:type", Array)
], EmbeddedItem.prototype, "arrayInsideEmbedded", void 0);
exports.EmbeddedItem = EmbeddedItem;
let Item = class Item {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "someText", void 0);
tslib_1.__decorate([
    (0, index_1.Column)((type) => EmbeddedItem),
    tslib_1.__metadata("design:type", EmbeddedItem)
], Item.prototype, "embedded", void 0);
Item = tslib_1.__decorate([
    (0, index_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map