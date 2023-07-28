"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const CreateDateColumn_1 = require("../../../../../src/decorator/columns/CreateDateColumn");
const UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
const DeleteDateColumn_1 = require("../../../../../src/decorator/columns/DeleteDateColumn");
const Subcounters_1 = require("./Subcounters");
class Counters {
}
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
    (0, CreateDateColumn_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Counters.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Counters.prototype, "updatedDate", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Counters.prototype, "deletedDate", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map