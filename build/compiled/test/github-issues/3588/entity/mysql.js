"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Session = class Session {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Session.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "timestamp",
        precision: 3,
        default: () => "CURRENT_TIMESTAMP(3)",
        onUpdate: "CURRENT_TIMESTAMP(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Session.prototype, "ts", void 0);
Session = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "Session" })
], Session);
exports.Session = Session;
//# sourceMappingURL=mysql.js.map