"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../src/index");
const User_1 = require("./User");
let Account = class Account {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Account.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Account.prototype, "user", void 0);
Account = tslib_1.__decorate([
    (0, index_1.Entity)()
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map