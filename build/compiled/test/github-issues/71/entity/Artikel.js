"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artikel = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Kollektion_1 = require("./Kollektion");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const Generated_1 = require("../../../../src/decorator/Generated");
let Artikel = class Artikel {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({ name: "artikel_id" }),
    (0, Generated_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], Artikel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "artikel_nummer" }),
    tslib_1.__metadata("design:type", String)
], Artikel.prototype, "nummer", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "artikel_name" }),
    tslib_1.__metadata("design:type", String)
], Artikel.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "artikel_extrabarcode" }),
    tslib_1.__metadata("design:type", String)
], Artikel.prototype, "extrabarcode", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "artikel_saison" }),
    tslib_1.__metadata("design:type", String)
], Artikel.prototype, "saison", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Kollektion_1.Kollektion, { cascade: true }),
    (0, JoinColumn_1.JoinColumn)({ name: "id_kollektion" }),
    tslib_1.__metadata("design:type", Kollektion_1.Kollektion)
], Artikel.prototype, "kollektion", void 0);
Artikel = tslib_1.__decorate([
    (0, Entity_1.Entity)("artikel")
], Artikel);
exports.Artikel = Artikel;
//# sourceMappingURL=Artikel.js.map