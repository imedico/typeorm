"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewB = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
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
        expression: `
        select * from test_entity -- V1 simlate view change with comment
    `,
    })
], ViewB);
exports.ViewB = ViewB;
//# sourceMappingURL=ViewB.js.map