"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationAsPrimaryKey = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Category_1 = require("./Category");
let RelationAsPrimaryKey = class RelationAsPrimaryKey {
};
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Category_1.Category),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Category_1.Category)
], RelationAsPrimaryKey.prototype, "category", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], RelationAsPrimaryKey.prototype, "categoryId", void 0);
RelationAsPrimaryKey = tslib_1.__decorate([
    (0, src_1.Entity)()
], RelationAsPrimaryKey);
exports.RelationAsPrimaryKey = RelationAsPrimaryKey;
//# sourceMappingURL=RelationAsPrimaryKey.js.map