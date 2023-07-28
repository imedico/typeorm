"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Four = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const One_1 = require("./One");
const src_1 = require("../../../../src");
let Four = class Four {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Four.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => One_1.One),
    tslib_1.__metadata("design:type", One_1.One)
], Four.prototype, "one", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "aaaaa", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "bbbbb", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "ccccc", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "ddddd", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "eeeee", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "fffff", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "ggggg", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Four.prototype, "hhhhh", void 0);
Four = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Four);
exports.Four = Four;
//# sourceMappingURL=Four.js.map