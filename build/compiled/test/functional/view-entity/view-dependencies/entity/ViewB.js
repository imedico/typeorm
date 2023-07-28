"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewB = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let ViewB = class ViewB {
};
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], ViewB.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], ViewB.prototype, "type", void 0);
ViewB = tslib_1.__decorate([
    (0, src_1.ViewEntity)({
        name: "view_b",
        expression: `select * from view_a -- V1 simulate view change with comment`,
        dependsOn: ["ViewA"],
    })
], ViewB);
exports.ViewB = ViewB;
//# sourceMappingURL=ViewB.js.map