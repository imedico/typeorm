"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerContact = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Customer_1 = require("./Customer");
let CustomerContact = class CustomerContact {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CustomerContact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.contacts),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], CustomerContact.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "" }),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "" }),
    tslib_1.__metadata("design:type", String)
], CustomerContact.prototype, "lastName", void 0);
CustomerContact = tslib_1.__decorate([
    (0, src_1.Entity)("CustomerContact"),
    (0, src_1.Index)(["firstName", "lastName"])
], CustomerContact);
exports.CustomerContact = CustomerContact;
//# sourceMappingURL=CustomerContact.js.map