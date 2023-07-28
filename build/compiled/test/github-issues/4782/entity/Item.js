"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Item = class Item {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Item.prototype, "date", void 0);
Item = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map