"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warn = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Warn = class Warn {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Warn.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Warn.prototype, "guild", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Warn.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Warn.prototype, "moderator", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Warn.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Warn.prototype, "createdAt", void 0);
Warn = tslib_1.__decorate([
    (0, src_1.Entity)("warnings")
], Warn);
exports.Warn = Warn;
//# sourceMappingURL=Warn.js.map