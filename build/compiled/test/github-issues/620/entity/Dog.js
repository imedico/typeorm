"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
const Cat_1 = require("./Cat");
let Dog = class Dog {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Dog.prototype, "DogID", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Cat_1.Cat, (cat) => cat.dog),
    tslib_1.__metadata("design:type", Array)
], Dog.prototype, "cats", void 0);
Dog = tslib_1.__decorate([
    (0, index_1.Entity)()
], Dog);
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map