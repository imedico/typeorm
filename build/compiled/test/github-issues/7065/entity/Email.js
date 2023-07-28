"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Contact_1 = require("./Contact");
const User_1 = require("./User");
let Email = class Email extends Contact_1.Contact {
};
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.emails),
    tslib_1.__metadata("design:type", User_1.User)
], Email.prototype, "user", void 0);
Email = tslib_1.__decorate([
    (0, src_1.ChildEntity)("email")
], Email);
exports.Email = Email;
//# sourceMappingURL=Email.js.map