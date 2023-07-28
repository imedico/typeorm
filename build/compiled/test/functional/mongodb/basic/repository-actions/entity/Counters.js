"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const User_1 = require("./User");
let Counters = class Counters {
};
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "_likes" }),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "_comments" }),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "_favorites" }),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "favorites", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(() => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Counters.prototype, "viewer", void 0);
Counters = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Counters);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map