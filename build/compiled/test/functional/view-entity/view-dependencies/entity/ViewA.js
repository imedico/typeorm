"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewA = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let ViewA = class ViewA {
};
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], ViewA.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], ViewA.prototype, "type", void 0);
ViewA = tslib_1.__decorate([
    (0, src_1.ViewEntity)({
        name: "view_a",
        expression: `
        select * from test_entity -- V1 simulate view change with comment
    `,
    })
], ViewA);
exports.ViewA = ViewA;
//# sourceMappingURL=ViewA.js.map