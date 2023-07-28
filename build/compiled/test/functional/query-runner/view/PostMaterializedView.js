"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMaterializedView = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let PostMaterializedView = class PostMaterializedView {
};
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostMaterializedView.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PostMaterializedView.prototype, "type", void 0);
PostMaterializedView = tslib_1.__decorate([
    (0, src_1.ViewEntity)({
        expression: `SELECT * FROM "post"`,
        materialized: true,
    })
], PostMaterializedView);
exports.PostMaterializedView = PostMaterializedView;
//# sourceMappingURL=PostMaterializedView.js.map