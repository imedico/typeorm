"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const AccountActivationToken_1 = require("./AccountActivationToken");
const index_1 = require("../../../../src/index");
let Account = class Account {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => AccountActivationToken_1.AccountActivationToken, "account", {
        cascade: ["insert", "remove"],
    }),
    tslib_1.__metadata("design:type", AccountActivationToken_1.AccountActivationToken)
], Account.prototype, "accountActivationToken", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "username", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Account.prototype, "password", void 0);
Account = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map