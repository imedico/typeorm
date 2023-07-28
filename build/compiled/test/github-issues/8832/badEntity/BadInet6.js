"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadInet6 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let BadInet6 = class BadInet6 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], BadInet6.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "inet6", length: "36" }),
    tslib_1.__metadata("design:type", String)
], BadInet6.prototype, "inet6", void 0);
BadInet6 = tslib_1.__decorate([
    (0, src_1.Entity)()
], BadInet6);
exports.BadInet6 = BadInet6;
//# sourceMappingURL=BadInet6.js.map