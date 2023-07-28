"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Contact_1 = require("./Contact");
let Booking = class Booking {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Contact_1.Contact, (contact) => contact.bookings, {
        eager: true,
    }),
    (0, index_1.JoinColumn)({
        name: "contact_id",
    }),
    tslib_1.__metadata("design:type", Contact_1.Contact)
], Booking.prototype, "contact", void 0);
Booking = tslib_1.__decorate([
    (0, index_1.Entity)()
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=Booking.js.map