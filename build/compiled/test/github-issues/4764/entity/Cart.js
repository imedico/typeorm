"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const CartItems_1 = require("./CartItems");
const User_1 = require("./User");
let Cart = class Cart {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Cart.prototype, "ID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Cart.prototype, "UNID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Cart.prototype, "Type", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Cart.prototype, "Cycle", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Cart.prototype, "Term", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Cart.prototype, "RegDate", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Cart.prototype, "ModifiedDate", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => CartItems_1.CartItems, (t) => t.Cart),
    tslib_1.__metadata("design:type", Array)
], Cart.prototype, "CartItems", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => User_1.User, (t) => t.Cart),
    (0, src_1.JoinColumn)({ name: "UNID" }),
    tslib_1.__metadata("design:type", User_1.User)
], Cart.prototype, "User", void 0);
Cart = tslib_1.__decorate([
    (0, src_1.Entity)()
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map