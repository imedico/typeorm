"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
let User = class User extends src_1.BaseEntity {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)("Setting", "asset", { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "settings", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Number, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map