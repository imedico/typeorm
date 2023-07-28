"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThisIsARealLongNameForAnEntityBecauseThisIsNecessary = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const other_long_name_entity_1 = require("./other-long-name.entity");
let ThisIsARealLongNameForAnEntityBecauseThisIsNecessary = class ThisIsARealLongNameForAnEntityBecauseThisIsNecessary {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ThisIsARealLongNameForAnEntityBecauseThisIsNecessary.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => other_long_name_entity_1.AnotherReallyLongNameForAnEntityBecauseThisIsNecessaryB, {
        eager: true,
    }),
    (0, src_1.JoinTable)({ name: "junction_b" }),
    tslib_1.__metadata("design:type", Array)
], ThisIsARealLongNameForAnEntityBecauseThisIsNecessary.prototype, "long_name_for_bs", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => other_long_name_entity_1.AnotherRealLongNameForAnEntityBecauseThisIsNecessaryC, {
        eager: true,
    }),
    (0, src_1.JoinTable)({ name: "junction_c" }),
    tslib_1.__metadata("design:type", Array)
], ThisIsARealLongNameForAnEntityBecauseThisIsNecessary.prototype, "long_name_for_cs", void 0);
ThisIsARealLongNameForAnEntityBecauseThisIsNecessary = tslib_1.__decorate([
    (0, Entity_1.Entity)({
        name: "real_long_name_t1",
    })
], ThisIsARealLongNameForAnEntityBecauseThisIsNecessary);
exports.ThisIsARealLongNameForAnEntityBecauseThisIsNecessary = ThisIsARealLongNameForAnEntityBecauseThisIsNecessary;
//# sourceMappingURL=long-name.entity.js.map