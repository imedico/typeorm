"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let Address = class Address {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "state", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.addresses),
    tslib_1.__metadata("design:type", User_1.User)
], Address.prototype, "user", void 0);
Address = tslib_1.__decorate([
    (0, src_1.Entity)()
], Address);
exports.Address = Address;
//# sourceMappingURL=Address.js.map