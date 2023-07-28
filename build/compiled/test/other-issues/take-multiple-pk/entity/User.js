"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Role_1 = require("./Role");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "handedness", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Role_1.Role, {
        cascade: ["insert"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map