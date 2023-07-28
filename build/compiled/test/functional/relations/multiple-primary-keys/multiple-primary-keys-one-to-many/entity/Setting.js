"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const User_1 = require("./User");
let Setting = class Setting extends src_1.BaseEntity {
    constructor(id, name, value) {
        super();
        this.assetId = id;
        this.name = name;
        this.value = value;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Setting.prototype, "assetId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)("User", "settings", {
        cascade: false,
        orphanedRowAction: "delete",
        nullable: false,
    }),
    tslib_1.__metadata("design:type", User_1.User)
], Setting.prototype, "asset", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Setting.prototype, "value", void 0);
Setting = tslib_1.__decorate([
    (0, src_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Number, String, String])
], Setting);
exports.Setting = Setting;
//# sourceMappingURL=Setting.js.map