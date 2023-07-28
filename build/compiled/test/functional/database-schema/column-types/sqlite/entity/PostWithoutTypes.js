"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithoutTypes = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
let PostWithoutTypes = class PostWithoutTypes {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithoutTypes.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithoutTypes.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], PostWithoutTypes.prototype, "boolean", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], PostWithoutTypes.prototype, "blob", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], PostWithoutTypes.prototype, "datetime", void 0);
PostWithoutTypes = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostWithoutTypes);
exports.PostWithoutTypes = PostWithoutTypes;
//# sourceMappingURL=PostWithoutTypes.js.map