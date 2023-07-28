"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Booking_1 = require("./Booking");
let Contact = class Contact {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Contact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Booking_1.Booking, (booking) => booking.contact),
    tslib_1.__metadata("design:type", Array)
], Contact.prototype, "bookings", void 0);
Contact = tslib_1.__decorate([
    (0, index_1.Entity)()
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map