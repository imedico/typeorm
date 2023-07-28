"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const TournamentGraph_1 = require("./TournamentGraph");
let Tournament = class Tournament {
    constructor(tournament) {
        if (tournament) {
            this.name = tournament.name;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Tournament.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => TournamentGraph_1.TournamentGraph, (graph) => graph.tournament),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", TournamentGraph_1.TournamentGraph)
], Tournament.prototype, "graph", void 0);
Tournament = tslib_1.__decorate([
    (0, index_1.Entity)(),
    (0, index_1.TableInheritance)({
        pattern: "STI",
        column: {
            name: "type",
            type: "varchar",
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Tournament);
exports.Tournament = Tournament;
//# sourceMappingURL=Tournament.js.map