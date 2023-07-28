"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BilliardsTournament = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Tournament_1 = require("./Tournament");
let BilliardsTournament = class BilliardsTournament extends Tournament_1.Tournament {
    constructor(billiardsTournament) {
        super(billiardsTournament);
    }
};
BilliardsTournament = tslib_1.__decorate([
    (0, index_1.ChildEntity)() // Causes Error of duplicated column in generated sql
    ,
    tslib_1.__metadata("design:paramtypes", [Object])
], BilliardsTournament);
exports.BilliardsTournament = BilliardsTournament;
//# sourceMappingURL=BilliardsTournament.js.map