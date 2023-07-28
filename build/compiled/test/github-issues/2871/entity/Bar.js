"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const documentEnum_1 = require("../documentEnum");
const enumTools_1 = require("../enumTools");
let Bar = class Bar extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Bar.prototype, "barId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: (0, enumTools_1.getEnumValues)(documentEnum_1.DocumentEnum),
        array: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Bar.prototype, "documents", void 0);
Bar = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map