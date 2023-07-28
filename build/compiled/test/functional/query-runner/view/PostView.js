"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostView = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let PostView = class PostView {
};
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostView.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PostView.prototype, "type", void 0);
PostView = tslib_1.__decorate([
    (0, src_1.ViewEntity)({
        expression: `SELECT * FROM "post"`,
    })
], PostView);
exports.PostView = PostView;
//# sourceMappingURL=PostView.js.map