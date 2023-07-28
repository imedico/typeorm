"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountActivationToken = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const TableInheritance_1 = require("../../../../src/decorator/entity/TableInheritance");
const Token_1 = require("./Token");
const index_1 = require("../../../../src/index");
const Account_1 = require("./Account");
let AccountActivationToken = class AccountActivationToken extends Token_1.Token {
    constructor(tokenSecret, expiresOn) {
        super();
        this.tokenSecret = tokenSecret;
        this.expiresOn = expiresOn;
    }
};
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Account_1.Account, "accountActivationToken", {
        cascade: ["insert", "update"],
    }),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Account_1.Account)
], AccountActivationToken.prototype, "account", void 0);
AccountActivationToken = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, TableInheritance_1.TableInheritance)({ column: { type: "varchar", name: "type" } }),
    tslib_1.__metadata("design:paramtypes", [String, Date])
], AccountActivationToken);
exports.AccountActivationToken = AccountActivationToken;
//# sourceMappingURL=AccountActivationToken.js.map