"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personalization = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Personalization = class Personalization {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", Number)
], Personalization.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Personalization.prototype, "logo", void 0);
Personalization = tslib_1.__decorate([
    (0, src_1.Entity)()
], Personalization);
exports.Personalization = Personalization;
//# sourceMappingURL=Personalization.js.map