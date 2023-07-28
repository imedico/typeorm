"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Account = class Account extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("bigint"),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "id", void 0);
Account = tslib_1.__decorate([
    (0, src_1.Entity)("accounts")
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map