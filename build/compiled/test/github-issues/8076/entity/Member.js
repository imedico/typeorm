"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Category_1 = require("./Category");
let Member = class Member extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Member.prototype, "pk", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        length: 250,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Category_1.Category, (c) => c.members),
    tslib_1.__metadata("design:type", Category_1.Category)
], Member.prototype, "category", void 0);
Member = tslib_1.__decorate([
    (0, src_1.Entity)()
], Member);
exports.Member = Member;
//# sourceMappingURL=Member.js.map