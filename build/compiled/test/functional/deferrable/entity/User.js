"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Company_1 = require("./Company");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Company_1.Company, (company) => company.id, {
        deferrable: "INITIALLY DEFERRED",
    }),
    tslib_1.__metadata("design:type", Company_1.Company)
], User.prototype, "company", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map