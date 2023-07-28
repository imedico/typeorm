"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushLog = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let PushLog = class PushLog {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PushLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PushLog.prototype, "token", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PushLog.prototype, "os", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], PushLog.prototype, "payload", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], PushLog.prototype, "response", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], PushLog.prototype, "success", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], PushLog.prototype, "created", void 0);
PushLog = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Index)(["token"], { unique: false }),
    (0, src_1.Index)(["created"], { unique: false })
], PushLog);
exports.PushLog = PushLog;
//# sourceMappingURL=PushLog.js.map