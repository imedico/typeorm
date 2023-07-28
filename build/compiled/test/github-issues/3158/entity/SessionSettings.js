"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSettings = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Session_1 = require("./Session");
let SessionSettings = class SessionSettings {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], SessionSettings.prototype, "sessionId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Session_1.Session, (session) => session.id),
    (0, src_1.JoinColumn)({ name: "sessionId", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", Session_1.Session)
], SessionSettings.prototype, "session", void 0);
SessionSettings = tslib_1.__decorate([
    (0, src_1.Entity)({
        name: "SessionSettings",
    })
], SessionSettings);
exports.SessionSettings = SessionSettings;
//# sourceMappingURL=SessionSettings.js.map