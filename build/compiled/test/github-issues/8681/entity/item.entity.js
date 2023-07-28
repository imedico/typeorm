"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const thing_entity_1 = require("./thing.entity");
let Item = class Item {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => thing_entity_1.Thing, (thing) => thing.items),
    tslib_1.__metadata("design:type", thing_entity_1.Thing)
], Item.prototype, "thing", void 0);
Item = tslib_1.__decorate([
    (0, src_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map