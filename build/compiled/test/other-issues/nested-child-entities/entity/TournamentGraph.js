"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentGraph = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Tournament_1 = require("./Tournament");
let TournamentGraph = class TournamentGraph {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TournamentGraph.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Tournament_1.Tournament, (tournament) => tournament.graph),
    tslib_1.__metadata("design:type", Tournament_1.Tournament)
], TournamentGraph.prototype, "tournament", void 0);
TournamentGraph = tslib_1.__decorate([
    (0, index_1.Entity)()
], TournamentGraph);
exports.TournamentGraph = TournamentGraph;
//# sourceMappingURL=TournamentGraph.js.map