"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcounters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
const PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const User_1 = require("./User");
class Subcounters {
}
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Subcounters.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Subcounters.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Subcounters.prototype, "watches", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => User_1.User),
    (0, JoinTable_1.JoinTable)({ name: "subcnt_users" }),
    tslib_1.__metadata("design:type", Array)
], Subcounters.prototype, "watchedUsers", void 0);
exports.Subcounters = Subcounters;
//# sourceMappingURL=Subcounters.js.map