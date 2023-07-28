"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPost = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let ExternalPost = class ExternalPost {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], ExternalPost.prototype, "outlet", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], ExternalPost.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ExternalPost.prototype, "title", void 0);
ExternalPost = tslib_1.__decorate([
    (0, src_1.Entity)()
], ExternalPost);
exports.ExternalPost = ExternalPost;
//# sourceMappingURL=ExternalPost.js.map