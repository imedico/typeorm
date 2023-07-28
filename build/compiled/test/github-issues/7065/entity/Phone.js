"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Contact_1 = require("./Contact");
const User_1 = require("./User");
let Phone = class Phone extends Contact_1.Contact {
};
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.phones),
    tslib_1.__metadata("design:type", User_1.User)
], Phone.prototype, "user", void 0);
Phone = tslib_1.__decorate([
    (0, src_1.ChildEntity)("phone")
], Phone);
exports.Phone = Phone;
//# sourceMappingURL=Phone.js.map