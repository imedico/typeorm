"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredential = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const User_1 = require("./User");
const src_1 = require("../../../../src");
let UserCredential = class UserCredential {
};
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)(() => User_1.User, {
        cascade: true,
    }),
    (0, JoinColumn_1.JoinColumn)({
        name: "id",
        referencedColumnName: "id",
    }),
    tslib_1.__metadata("design:type", User_1.User)
], UserCredential.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserCredential.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserCredential.prototype, "password", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserCredential.prototype, "salt", void 0);
UserCredential = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], UserCredential);
exports.UserCredential = UserCredential;
//# sourceMappingURL=UserCredential.js.map