"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithOptions = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const src_2 = require("../../../../../../src");
const src_3 = require("../../../../../../src");
let PostWithOptions = class PostWithOptions {
};
tslib_1.__decorate([
    (0, src_2.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithOptions.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("dec", { precision: 10, scale: 2 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "dec", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("decimal", { precision: 10, scale: 3 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "decimal", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("varchar", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("nvarchar", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "nvarchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("alphanum", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "alphanum", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("shorttext", { length: 50 }),
    tslib_1.__metadata("design:type", String)
], PostWithOptions.prototype, "shorttext", void 0);
PostWithOptions = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostWithOptions);
exports.PostWithOptions = PostWithOptions;
//# sourceMappingURL=PostWithOptions.js.map