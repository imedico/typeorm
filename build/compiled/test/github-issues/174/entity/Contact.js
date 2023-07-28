"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
class Contact {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "email", void 0);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map