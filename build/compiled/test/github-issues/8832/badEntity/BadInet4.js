"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadInet4 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let BadInet4 = class BadInet4 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], BadInet4.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "inet4", length: "36" }),
    tslib_1.__metadata("design:type", String)
], BadInet4.prototype, "inet4", void 0);
BadInet4 = tslib_1.__decorate([
    (0, src_1.Entity)()
], BadInet4);
exports.BadInet4 = BadInet4;
//# sourceMappingURL=BadInet4.js.map