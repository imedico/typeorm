"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fact = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Rule_1 = require("./Rule");
let Fact = class Fact {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "int" }),
    tslib_1.__metadata("design:type", Number)
], Fact.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Fact.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Rule_1.Rule, (rule) => rule.fact),
    tslib_1.__metadata("design:type", Array)
], Fact.prototype, "rules", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Fact.prototype, "name", void 0);
Fact = tslib_1.__decorate([
    (0, src_1.Entity)("fact")
], Fact);
exports.Fact = Fact;
//# sourceMappingURL=Fact.js.map