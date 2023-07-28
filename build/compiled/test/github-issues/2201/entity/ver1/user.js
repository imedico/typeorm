"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../src/index");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const BaseEntity_1 = require("../../../../../src/repository/BaseEntity");
const context_1 = require("./context");
let User = class User extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => context_1.RecordContext, (context) => context.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "contexts", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "users" })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map