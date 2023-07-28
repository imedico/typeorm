"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var Category;
(function (Category) {
    Category["MensAndWomensClothing"] = "Men's and Women's Clothing";
    Category["Footwear"] = "Footwear";
})(Category || (Category = {}));
let Example = class Example {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], Example.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Category }),
    tslib_1.__metadata("design:type", String)
], Example.prototype, "category", void 0);
Example = tslib_1.__decorate([
    (0, src_1.Entity)()
], Example);
exports.Example = Example;
//# sourceMappingURL=Example.js.map