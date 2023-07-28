"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embedded = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
class Embedded {
}
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Embedded.prototype, "relationUser1", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Embedded.prototype, "relationUser2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Embedded.prototype, "relationUser2Id", void 0);
exports.Embedded = Embedded;
//# sourceMappingURL=Embedded.js.map