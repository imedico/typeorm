"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../src/index");
const Account_1 = require("./Account");
let Person = class Person {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)(() => Account_1.Account),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Account_1.Account)
], Person.prototype, "account", void 0);
Person = tslib_1.__decorate([
    (0, index_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map