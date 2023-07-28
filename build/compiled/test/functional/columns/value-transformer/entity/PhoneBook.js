"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneBook = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
class PhonesTransformer {
    to(value) {
        return JSON.stringify([...value]);
    }
    from(value) {
        return new Map(JSON.parse(value));
    }
}
let PhoneBook = class PhoneBook {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PhoneBook.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PhoneBook.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: String, transformer: new PhonesTransformer() }),
    tslib_1.__metadata("design:type", Map)
], PhoneBook.prototype, "phones", void 0);
PhoneBook = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PhoneBook);
exports.PhoneBook = PhoneBook;
//# sourceMappingURL=PhoneBook.js.map