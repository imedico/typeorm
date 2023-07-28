"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Contact = class Contact {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Contact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Contact.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "value", void 0);
Contact = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { type: String, name: "type" } })
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map