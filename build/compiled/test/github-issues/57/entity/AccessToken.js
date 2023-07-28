"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const User_1 = require("./User");
let AccessToken = class AccessToken {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    (0, src_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], AccessToken.prototype, "primaryKey", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], AccessToken.prototype, "expireTime", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User, (user) => user.access_token, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", User_1.User)
], AccessToken.prototype, "user", void 0);
AccessToken = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], AccessToken);
exports.AccessToken = AccessToken;
//# sourceMappingURL=AccessToken.js.map