"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadUuid = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let BadUuid = class BadUuid {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], BadUuid.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid", length: "36" }),
    tslib_1.__metadata("design:type", String)
], BadUuid.prototype, "uuid", void 0);
BadUuid = tslib_1.__decorate([
    (0, src_1.Entity)()
], BadUuid);
exports.BadUuid = BadUuid;
//# sourceMappingURL=BadUuid.js.map