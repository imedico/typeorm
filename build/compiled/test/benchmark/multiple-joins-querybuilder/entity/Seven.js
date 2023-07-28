"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seven = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const One_1 = require("./One");
const src_1 = require("../../../../src");
let Seven = class Seven {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Seven.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => One_1.One),
    tslib_1.__metadata("design:type", One_1.One)
], Seven.prototype, "one", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "aaaaa", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "bbbbb", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "ccccc", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "ddddd", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "eeeee", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "fffff", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "ggggg", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Seven.prototype, "hhhhh", void 0);
Seven = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Seven);
exports.Seven = Seven;
//# sourceMappingURL=Seven.js.map