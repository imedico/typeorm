"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.One = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const src_1 = require("../../../../src");
const Two_1 = require("./Two");
const Three_1 = require("./Three");
const Four_1 = require("./Four");
const Five_1 = require("./Five");
const Six_1 = require("./Six");
const Seven_1 = require("./Seven");
const Eight_1 = require("./Eight");
const Nine_1 = require("./Nine");
const Ten_1 = require("./Ten");
let One = class One {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], One.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Two_1.Two, (two) => two.one),
    tslib_1.__metadata("design:type", Two_1.Two)
], One.prototype, "two", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Three_1.Three, (three) => three.one),
    tslib_1.__metadata("design:type", Three_1.Three)
], One.prototype, "three", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Four_1.Four, (four) => four.one),
    tslib_1.__metadata("design:type", Four_1.Four)
], One.prototype, "four", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Five_1.Five, (five) => five.one),
    tslib_1.__metadata("design:type", Five_1.Five)
], One.prototype, "five", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Six_1.Six, (six) => six.one),
    tslib_1.__metadata("design:type", Six_1.Six)
], One.prototype, "six", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Seven_1.Seven, (seven) => seven.one),
    tslib_1.__metadata("design:type", Seven_1.Seven)
], One.prototype, "seven", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Eight_1.Eight, (eight) => eight.one),
    tslib_1.__metadata("design:type", Eight_1.Eight)
], One.prototype, "eight", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Nine_1.Nine, (nine) => nine.one),
    tslib_1.__metadata("design:type", Nine_1.Nine)
], One.prototype, "nine", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Ten_1.Ten, (ten) => ten.one),
    tslib_1.__metadata("design:type", Ten_1.Ten)
], One.prototype, "ten", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "aaaaa", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "bbbbb", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "ccccc", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "ddddd", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "eeeee", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "fffff", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "ggggg", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "hhhhh", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "text" }),
    tslib_1.__metadata("design:type", String)
], One.prototype, "iiiii", void 0);
One = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], One);
exports.One = One;
//# sourceMappingURL=One.js.map