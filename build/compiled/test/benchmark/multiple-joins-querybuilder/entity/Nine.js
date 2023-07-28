"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nine = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const One_1 = require("./One");
const src_1 = require("../../../../src");
let Nine = class Nine {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Nine.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => One_1.One),
    tslib_1.__metadata("design:type", One_1.One)
], Nine.prototype, "one", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "aaaaa", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "bbbbb", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "ccccc", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "ddddd", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "eeeee", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "fffff", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "ggggg", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], Nine.prototype, "hhhhh", void 0);
Nine = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Nine);
exports.Nine = Nine;
//# sourceMappingURL=Nine.js.map