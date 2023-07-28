"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Index_1 = require("../../../../src/decorator/Index");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const Platform_1 = require("./Platform");
let Game = class Game {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Game.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        length: 80,
    }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        name: "search_terms",
        length: 80,
    }),
    tslib_1.__metadata("design:type", String)
], Game.prototype, "searchTerms", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        name: "reviewed",
    }),
    tslib_1.__metadata("design:type", Boolean)
], Game.prototype, "isReviewed", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Platform_1.Platform, (platform) => platform.games, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Game.prototype, "platforms", void 0);
Game = tslib_1.__decorate([
    (0, Entity_1.Entity)("games"),
    (0, Index_1.Index)("game_name_idx", ["name"], { unique: true })
], Game);
exports.Game = Game;
//# sourceMappingURL=Game.js.map