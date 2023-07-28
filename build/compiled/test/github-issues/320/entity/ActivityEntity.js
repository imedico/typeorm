"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityEntity = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const TileEntity_1 = require("./TileEntity");
let ActivityEntity = class ActivityEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], ActivityEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "datetime" }),
    tslib_1.__metadata("design:type", Date)
], ActivityEntity.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => TileEntity_1.TileEntity, (tile) => tile.activities, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], ActivityEntity.prototype, "tiles", void 0);
ActivityEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)("activity")
], ActivityEntity);
exports.ActivityEntity = ActivityEntity;
//# sourceMappingURL=ActivityEntity.js.map