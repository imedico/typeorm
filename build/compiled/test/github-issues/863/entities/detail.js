"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detail = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../src/decorator/Index");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const master_1 = require("./master");
let Detail = class Detail {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({
        length: 20,
    }),
    tslib_1.__metadata("design:type", String)
], Detail.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        nullable: false,
        length: 20,
    }),
    tslib_1.__metadata("design:type", String)
], Detail.prototype, "masterId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => master_1.Master, (master) => master.details, {
        nullable: false,
        onDelete: "CASCADE",
    }),
    (0, JoinColumn_1.JoinColumn)({
        name: "masterId",
    }),
    tslib_1.__metadata("design:type", master_1.Master)
], Detail.prototype, "master", void 0);
Detail = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("IDX_UNQ_MasterId", (type) => [type.masterId], { unique: true })
], Detail);
exports.Detail = Detail;
//# sourceMappingURL=detail.js.map