"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Address_1 = require("./Address");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "inet4" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "inet4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "inet6" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "inet6", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid", generated: "uuid" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "another_uuid_field", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Address_1.Address, (address) => address.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "addresses", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map