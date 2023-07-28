"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Office = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Unique_1 = require("../../../../src/decorator/Unique");
const Company_1 = require("./Company");
let Office = class Office {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Office.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Office.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Company_1.Company, (company) => company.id, {
        deferrable: "INITIALLY IMMEDIATE",
    }),
    tslib_1.__metadata("design:type", Company_1.Company)
], Office.prototype, "company", void 0);
Office = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Unique_1.Unique)(["name"], { deferrable: "INITIALLY IMMEDIATE" })
], Office);
exports.Office = Office;
//# sourceMappingURL=Office.js.map