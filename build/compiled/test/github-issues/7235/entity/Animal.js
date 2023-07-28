"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Animal = class Animal {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Animal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Animal.prototype, "name", void 0);
Animal = tslib_1.__decorate([
    (0, src_1.Entity)()
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map