"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Session = class Session {
    constructor() {
        this.cookie = "";
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({
        comment: "That's the way the cookie crumbles",
    }),
    tslib_1.__metadata("design:type", String)
], Session.prototype, "cookie", void 0);
Session = tslib_1.__decorate([
    (0, src_1.Entity)()
], Session);
exports.Session = Session;
//# sourceMappingURL=Session.js.map