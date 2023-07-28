"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Cart_1 = require("./Cart");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "ID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "RegDate", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "ModifiedDate", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Cart_1.Cart, (t) => t.User),
    tslib_1.__metadata("design:type", Cart_1.Cart)
], User.prototype, "Cart", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map