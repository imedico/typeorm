"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Site = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Category_1 = require("./Category");
let Site = class Site extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Site.prototype, "pk", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Site.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        length: 250,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Site.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Category_1.Category),
    tslib_1.__metadata("design:type", Category_1.Category)
], Site.prototype, "parentCategory", void 0);
Site = tslib_1.__decorate([
    (0, src_1.Entity)()
], Site);
exports.Site = Site;
//# sourceMappingURL=Site.js.map