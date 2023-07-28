"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let Company = class Company {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Company.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Company.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => User_1.User),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Company.prototype, "admin", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => User_1.User, (user) => user.company),
    tslib_1.__metadata("design:type", Array)
], Company.prototype, "staff", void 0);
Company = tslib_1.__decorate([
    (0, src_1.Entity)()
], Company);
exports.Company = Company;
//# sourceMappingURL=Company.js.map