"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithOptions = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
let PostWithOptions = class PostWithOptions {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithOptions.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ length: 50 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "string", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ length: 50 }),
    tslib_1.__metadata("design:type", Buffer)
], PostWithOptions.prototype, "bytes", void 0);
PostWithOptions = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostWithOptions);
exports.PostWithOptions = PostWithOptions;
//# sourceMappingURL=PostWithOptions.js.map