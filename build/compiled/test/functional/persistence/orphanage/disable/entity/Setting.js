"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const tslib_1 = require("tslib");
const User_1 = require("./User");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
let Setting = class Setting {
    constructor(data) {
        this.data = data;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Setting.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "data", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => User_1.User, (user) => user.settings, {
        orphanedRowAction: "disable",
    }),
    (0, JoinColumn_1.JoinColumn)({ name: "userId" }),
    tslib_1.__metadata("design:type", User_1.User)
], Setting.prototype, "user", void 0);
Setting = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [String])
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=Setting.js.map