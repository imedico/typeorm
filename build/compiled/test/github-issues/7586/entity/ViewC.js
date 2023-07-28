"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewC = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let ViewC = class ViewC {
};
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], ViewC.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], ViewC.prototype, "type", void 0);
ViewC = tslib_1.__decorate([
    (0, src_1.ViewEntity)({
        expression: `
        select * from test_entity -- V1 simlate view change with comment
    `,
    })
], ViewC);
exports.ViewC = ViewC;
//# sourceMappingURL=ViewC.js.map