"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquadBilliardsTournament = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const BilliardsTournament_1 = require("./BilliardsTournament");
let SquadBilliardsTournament = class SquadBilliardsTournament extends BilliardsTournament_1.BilliardsTournament {
    constructor(squadBilliardsTournament) {
        super(squadBilliardsTournament);
    }
};
SquadBilliardsTournament = tslib_1.__decorate([
    (0, index_1.ChildEntity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], SquadBilliardsTournament);
exports.SquadBilliardsTournament = SquadBilliardsTournament;
//# sourceMappingURL=SquadBilliardsTournament.js.map