"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverySlot = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let DeliverySlot = class DeliverySlot {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DeliverySlot.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DeliverySlot.prototype, "name", void 0);
DeliverySlot = tslib_1.__decorate([
    (0, src_1.Entity)()
], DeliverySlot);
exports.DeliverySlot = DeliverySlot;
//# sourceMappingURL=DeliverySlot.js.map