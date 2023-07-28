"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locale = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const Message_1 = require("./Message");
let Locale = class Locale {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)("varchar", { length: 5 }),
    tslib_1.__metadata("design:type", String)
], Locale.prototype, "code", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("varchar", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], Locale.prototype, "englishName", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)(() => Message_1.Message, { onDelete: "SET NULL" }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Message_1.Message)
], Locale.prototype, "name", void 0);
Locale = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Locale);
exports.Locale = Locale;
//# sourceMappingURL=Locale.js.map