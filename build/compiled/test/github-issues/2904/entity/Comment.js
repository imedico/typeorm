"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class Comment {
}
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "savedBy", void 0);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map