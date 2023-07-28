"use strict";
var TileEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ActivityEntity_1 = require("./ActivityEntity");
let TileEntity = TileEntity_1 = class TileEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], TileEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => TileEntity_1, (tile) => tile.children, {
        cascade: ["insert"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], TileEntity.prototype, "parents", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => TileEntity_1, (tile) => tile.parents, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Array)
], TileEntity.prototype, "children", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => ActivityEntity_1.ActivityEntity, (activity) => activity.tiles, {
        cascade: ["insert"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], TileEntity.prototype, "activities", void 0);
TileEntity = TileEntity_1 = tslib_1.__decorate([
    (0, Entity_1.Entity)("tile")
], TileEntity);
exports.TileEntity = TileEntity;
//# sourceMappingURL=TileEntity.js.map