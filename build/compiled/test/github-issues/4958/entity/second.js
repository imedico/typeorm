"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Testing = class Testing {
};
tslib_1.__decorate([
    (0, src_1.Column)("int", {
        nullable: false,
        primary: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Testing.prototype, "notId", void 0);
Testing = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "second" })
], Testing);
exports.default = Testing;
//# sourceMappingURL=second.js.map