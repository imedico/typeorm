"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
const PrimaryColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryColumn");
const Category_1 = require("./Category");
const Subcounters_1 = require("./Subcounters");
class Counters {
}
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
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
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.posts),
    (0, JoinTable_1.JoinTable)({ name: "counter_categories" }),
    tslib_1.__metadata("design:type", Array)
], Counters.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(() => Subcounters_1.Subcounters, { prefix: "sub" }),
    tslib_1.__metadata("design:type", Subcounters_1.Subcounters)
], Counters.prototype, "subcntrs", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map