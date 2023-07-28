"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
    constructor() {
        this.token = null;
        this.dnd = false;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar", { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "token", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "tinyint",
        default: 0,
        width: 1,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "dnd", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map