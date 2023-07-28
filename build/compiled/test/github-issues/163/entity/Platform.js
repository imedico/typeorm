"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Index_1 = require("../../../../src/decorator/Index");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Game_1 = require("./Game");
let Platform = class Platform {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Platform.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], Platform.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], Platform.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Game_1.Game, (game) => game.platforms),
    tslib_1.__metadata("design:type", Array)
], Platform.prototype, "games", void 0);
Platform = tslib_1.__decorate([
    (0, Entity_1.Entity)("platforms"),
    (0, Index_1.Index)("platform_name_idx", ["name"], { unique: true })
], Platform);
exports.Platform = Platform;
//# sourceMappingURL=Platform.js.map