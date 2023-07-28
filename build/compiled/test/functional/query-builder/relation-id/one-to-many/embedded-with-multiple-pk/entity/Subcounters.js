"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcounters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryColumn");
const OneToMany_1 = require("../../../../../../../src/decorator/relations/OneToMany");
const User_1 = require("./User");
class Subcounters {
}
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Subcounters.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Subcounters.prototype, "watches", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => User_1.User, (user) => user.post),
    tslib_1.__metadata("design:type", Array)
], Subcounters.prototype, "watchedUsers", void 0);
exports.Subcounters = Subcounters;
//# sourceMappingURL=Subcounters.js.map