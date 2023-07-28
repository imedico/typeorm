"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Group_1 = require("./Group");
let Player = class Player {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Player.prototype, "email", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Group_1.Group),
    tslib_1.__metadata("design:type", Group_1.Group)
], Player.prototype, "group", void 0);
Player = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.js.map