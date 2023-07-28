"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Email_1 = require("./Email");
const Phone_1 = require("./Phone");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Email_1.Email, (email) => email.user, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "emails", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Phone_1.Phone, (phone) => phone.user, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "phones", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map