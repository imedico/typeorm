"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const User_1 = require("./User");
const Subcounters_1 = require("./Subcounters");
class Counters {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "code", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "favorites", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(() => Subcounters_1.Subcounters, { prefix: "subcnt" }),
    tslib_1.__metadata("design:type", Subcounters_1.Subcounters)
], Counters.prototype, "subcounters", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => User_1.User, (user) => user.likedPost),
    tslib_1.__metadata("design:type", Array)
], Counters.prototype, "likedUsers", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map