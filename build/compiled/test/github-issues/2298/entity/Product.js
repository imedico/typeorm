"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TicketProduct_1 = require("./TicketProduct");
let Product = class Product {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => TicketProduct_1.TicketProduct, (ticketp) => ticketp.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "ticketProduct", void 0);
Product = tslib_1.__decorate([
    (0, src_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map