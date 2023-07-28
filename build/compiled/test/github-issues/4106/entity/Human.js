"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Human = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const GenderEnum_1 = require("./GenderEnum");
let Human = class Human {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Human.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Human.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "enum",
        enum: GenderEnum_1.Gender,
        enumName: "genderEnum",
        name: "Gender",
    }),
    tslib_1.__metadata("design:type", String)
], Human.prototype, "gender", void 0);
Human = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Human);
exports.Human = Human;
//# sourceMappingURL=Human.js.map