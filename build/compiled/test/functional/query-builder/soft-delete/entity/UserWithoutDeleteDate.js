"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithoutDeleteDate = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let UserWithoutDeleteDate = class UserWithoutDeleteDate {
    constructor() {
        this.likesCount = 0;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserWithoutDeleteDate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserWithoutDeleteDate.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserWithoutDeleteDate.prototype, "likesCount", void 0);
UserWithoutDeleteDate = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], UserWithoutDeleteDate);
exports.UserWithoutDeleteDate = UserWithoutDeleteDate;
//# sourceMappingURL=UserWithoutDeleteDate.js.map