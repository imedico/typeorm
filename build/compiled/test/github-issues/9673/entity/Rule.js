"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Node_1 = require("./Node");
const Fact_1 = require("./Fact");
let Rule = class Rule {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "int" }),
    tslib_1.__metadata("design:type", Number)
], Rule.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Rule.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Rule.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Fact_1.Fact, (fact) => fact.rules, { eager: true }),
    (0, src_1.JoinColumn)([{ name: "factId", referencedColumnName: "id" }]),
    tslib_1.__metadata("design:type", Fact_1.Fact)
], Rule.prototype, "fact", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Rule.prototype, "factId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Node_1.Node, (node) => node.rules),
    tslib_1.__metadata("design:type", Node_1.Node)
], Rule.prototype, "node", void 0);
Rule = tslib_1.__decorate([
    (0, src_1.Entity)("rule")
], Rule);
exports.Rule = Rule;
//# sourceMappingURL=Rule.js.map