"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDefaultValues = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let PostDefaultValues = class PostDefaultValues {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostDefaultValues.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDefaultValues.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "hello post" }),
    tslib_1.__metadata("design:type", String)
], PostDefaultValues.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], PostDefaultValues.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], PostDefaultValues.prototype, "addDate", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], PostDefaultValues.prototype, "views", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PostDefaultValues.prototype, "description", void 0);
PostDefaultValues = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostDefaultValues);
exports.PostDefaultValues = PostDefaultValues;
//# sourceMappingURL=PostDefaultValues.js.map