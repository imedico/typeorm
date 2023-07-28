"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "json" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "jsonData", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map