"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const CustomerContact_1 = require("./CustomerContact");
let Customer = class Customer extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Customer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Customer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => CustomerContact_1.CustomerContact, (contact) => contact.customer),
    tslib_1.__metadata("design:type", Array)
], Customer.prototype, "contacts", void 0);
Customer = tslib_1.__decorate([
    (0, src_1.Entity)("Customer")
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map